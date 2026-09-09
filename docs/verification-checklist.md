# Verification Checklist

Use this checklist before calling a federated feature ready for handoff. Endpoint availability alone is not enough: a remote can return `200` while crashing when React renders a shared UI component.

## Static Checks

Run from the repository root:

```bash
pnpm format:check
pnpm --filter @commerce/shell typecheck
pnpm build
```

Or run the combined gate:

```bash
pnpm check
```

Confirm that:

- The shell and every remote build without webpack errors.
- The shell typecheck passes.
- CSS and CSS Module imports are handled by explicit webpack rules.
- Shared packages used by remotes are listed in Module Federation `shared` configuration.
- The shell uses an asynchronous federation bootstrap before React imports are consumed.

## Runtime Checks

Start the complete local stack:

```bash
pnpm dev
```

Then run:

```bash
pnpm check:runtime
```

Confirm that:

- `http://localhost:3000` responds.
- `remoteEntry.js` responds from ports `3001`, `3002`, and `3003`.
- Remote responses include cross-origin development headers:
  - `Access-Control-Allow-Origin: *`
  - `Cross-Origin-Resource-Policy: cross-origin`
- REST and GraphQL health endpoints respond.
- The GraphQL dashboard query returns non-empty data.
- Unauthenticated product access returns `401`.

## Browser Smoke Checks

Use a fresh browser tab or hard refresh after restarting a remote:

```text
Cmd + Shift + R
```

Authenticate with the local MVP account:

```text
Email: admin@commerce.com
Password: admin123
```

Open each route and wait for its content to render:

- `http://localhost:3000/products`
- `http://localhost:3000/orders`
- `http://localhost:3000/users`

For each route, verify:

- No runtime error overlay appears.
- The remote heading and data are visible.
- The browser console has no uncaught exception.
- Shared `@commerce/ui` components render correctly, especially `Text`, `Heading`, `Input`, `Button`, and `Spinner`.

## Incident Record: CSS Module Runtime Crash

### Symptom

The browser reported a generic cross-origin `Script error` from a remote. The actual browser page error was:

```text
TypeError: Cannot read properties of undefined (reading 'text')
at Text (.../src_App_tsx.main.js)
```

The error appeared on products, orders, and users even though all remote entries returned `200`.

### Root Cause

The three remotes treated every `.css` file as global CSS. Shared `@commerce/ui` components import files such as `Text.module.css` as CSS Modules:

```ts
import styles from "./Text.module.css";
```

Because the remote webpack configs did not generate the expected default class-map export, `styles` was undefined at render time.

### Fix

Each remote webpack config now has separate rules:

1. `.module.css` uses `css-loader` with:
   - `esModule: true`
   - `modules.namedExport: false`
   - `modules.exportLocalsConvention: "asIs"`
2. Other `.css` files use the global CSS loader rule.
3. The module rule excludes `.module.css` from the global rule.

The three affected configs are:

- `apps/products/webpack.config.cjs`
- `apps/orders/webpack.config.cjs`
- `apps/users/webpack.config.cjs`

## Required Sign-Off

Do not mark a remote complete until all of these pass:

```bash
pnpm check
pnpm check:runtime
```

And all three browser routes render successfully:

```text
/products
/orders
/users
```

The runtime script checks network and API boundaries. The browser smoke check is still required because React render failures, CSS-module export mismatches, shared singleton issues, and remote component errors can occur after the network checks pass.
