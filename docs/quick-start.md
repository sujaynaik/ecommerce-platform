# Ecommerce Platform Quick Start

Use this page as the day-to-day reference for running the local MVP.

## 1. Open The Repository

```bash
cd /Users/sujaynaik/Documents/projects/react/ecommerce-platform
```

## 2. Install Dependencies

Run this once, or after dependency changes:

```bash
pnpm install
```

The repository uses pnpm `11.17.0`.

## 3. Start The Project

Start the shell, all federated remotes, REST API, and GraphQL API together:

```bash
pnpm dev
```

The processes run in parallel. Keep this terminal open.

## 4. Open The Application

Open the host shell:

```text
http://localhost:3000
```

The shell provides login and navigation to:

- `/dashboard`
- `/products`
- `/orders`
- `/users`

## 5. Service URLs

| Service         | URL                           |
| --------------- | ----------------------------- |
| Shell host      | http://localhost:3000         |
| Products remote | http://localhost:3001         |
| Orders remote   | http://localhost:3002         |
| Users remote    | http://localhost:3003         |
| REST API        | http://localhost:4000         |
| GraphQL API     | http://localhost:4001/graphql |

The shell loads the three remotes through webpack Module Federation. The REST API handles authenticated mutations and operational reads. The GraphQL API provides read-only dashboard/catalog/order/user queries for the MVP.

## 6. Verify The Running Project

With `pnpm dev` still running, open a second terminal:

```bash
cd /Users/sujaynaik/Documents/projects/react/ecommerce-platform
pnpm check:runtime
```

The runtime check verifies:

- Shell availability.
- Products, orders, and users remote entries.
- REST and GraphQL health endpoints.
- A GraphQL dashboard query.
- The protected REST products route.

## 7. Run Build Checks

Run formatting, shell typechecking, and all workspace builds:

```bash
pnpm check
```

Run both build and runtime checks:

```bash
pnpm check:all
```

## 8. Stop The Project

Return to the terminal running `pnpm dev` and press:

```text
Ctrl+C
```

## Troubleshooting

Check whether a service port is already in use:

```bash
for port in 3000 3001 3002 3003 4000 4001; do
  lsof -nP -iTCP:$port -sTCP:LISTEN
 done
```

If a previous process is using a port, stop that process or close its terminal before running `pnpm dev` again.

Product, order, user, and GraphQL data are currently stored in memory and reset when the backend processes restart.
