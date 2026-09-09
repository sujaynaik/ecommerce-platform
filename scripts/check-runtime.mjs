const checks = [
  ["shell", "http://localhost:3000/", 200],
  ["products remote", "http://localhost:3001/remoteEntry.js", 200],
  ["orders remote", "http://localhost:3002/remoteEntry.js", 200],
  ["users remote", "http://localhost:3003/remoteEntry.js", 200],
  ["REST health", "http://localhost:4000/health", 200],
  ["GraphQL health", "http://localhost:4001/health", 200],
];

let failed = false;

for (const [name, url, expectedStatus] of checks) {
  try {
    const response = await fetch(url);
    if (response.status !== expectedStatus) {
      throw new Error(
        `expected ${expectedStatus}, received ${response.status}`,
      );
    }
    console.log(`PASS ${name}: ${response.status}`);
  } catch (error) {
    failed = true;
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

try {
  const response = await fetch("http://localhost:4001/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: "{ dashboard { productCount orderCount userCount revenue } }",
    }),
  });
  const payload = await response.json();
  const dashboard = payload.data?.dashboard;
  if (!dashboard || dashboard.productCount < 1 || dashboard.orderCount < 1) {
    throw new Error("dashboard query returned incomplete data");
  }
  console.log("PASS GraphQL dashboard query");
} catch (error) {
  failed = true;
  console.error(`FAIL GraphQL dashboard query: ${error.message}`);
}

try {
  const response = await fetch("http://localhost:4000/products");
  if (response.status !== 401) {
    throw new Error(`expected 401, received ${response.status}`);
  }
  console.log("PASS REST product auth boundary: 401");
} catch (error) {
  failed = true;
  console.error(`FAIL REST product auth boundary: ${error.message}`);
}

if (failed) {
  console.error(
    "Runtime checks failed. Start the workspace with `pnpm dev` first.",
  );
  process.exitCode = 1;
} else {
  console.log("All runtime checks passed.");
}
