# Ecommerce Platform Current State

Updated: 2026-09-09

## Purpose

This repository is an MVP ecommerce operations platform. It is organized as a micro frontend system with a shell host and independently buildable products, orders, and users remotes. The backend currently uses in-memory data so the product can be demonstrated locally without a database.

## Run And Check

Install dependencies:

```bash
pnpm install
```

Start the full local workspace:

```bash
pnpm dev
```

The local services use these ports:

| Service         | URL                           | Purpose                                                   |
| --------------- | ----------------------------- | --------------------------------------------------------- |
| Shell           | http://localhost:3000         | Host application and authentication entrypoint            |
| Products remote | http://localhost:3001         | Catalog listing and product creation                      |
| Orders remote   | http://localhost:3002         | Order listing and status updates                          |
| Users remote    | http://localhost:3003         | Team directory                                            |
| REST API        | http://localhost:4000         | Authenticated operational APIs                            |
| GraphQL API     | http://localhost:4001/graphql | Read-oriented catalog, order, user, and dashboard gateway |

Run deterministic source/build checks:

```bash
pnpm check
```

Run endpoint and federation checks while the services are running:

```bash
pnpm check:runtime
```

Run both types of checks:

```bash
pnpm check:all
```

## Architecture

```text
apps/shell
  webpack Module Federation host
  /login, /dashboard, /products, /orders, /users
       |
       | remoteEntry.js
       +--> apps/products
       +--> apps/orders
       +--> apps/users
       |
       +--> packages/api singleton
       +--> packages/ui

backend/rest-api
  /auth
  /products
  /orders
  /users

backend/graphql-api
  /graphql
  read-only dashboard/catalog/order/user queries
```

The shell loads remotes from fixed development URLs configured in `apps/shell/webpack/webpack.common.js`. React, React DOM, React Router, React Query, and `@commerce/api` are configured as Module Federation singletons. The remotes can also run independently on their own ports.

## Current Features

### Authentication

- Login, refresh, and `/auth/me` are provided by the REST API.
- Access and refresh tokens are stored in browser local storage by `packages/api`.
- API request and refresh interceptors are registered by the shell and each standalone remote.
- Protected shell routes include products, orders, and users.
- The current backend uses one hard-coded admin account for the MVP.

### Products

- Authenticated REST list, detail, create, update, and delete endpoints.
- Product name, SKU, price, stock, status, validation, and SKU uniqueness checks.
- Federated products remote supports catalog listing and product creation.
- The existing shell product feature remains in the repository but the shell route loads the federated remote.

### Orders

- Authenticated REST list, create, and status update endpoints.
- Order items resolve against the in-memory product catalog.
- Supported statuses: `PENDING`, `PAID`, `SHIPPED`, and `CANCELLED`.
- Federated orders remote lists orders and updates status.

### Users

- Authenticated REST user listing endpoint.
- Federated users remote displays the current admin and staff records.
- Roles currently include `ADMIN` and `STAFF`; invitation is represented as UI intent only and is not persisted yet.

### GraphQL

The GraphQL API is a read gateway with these queries:

- `products`
- `orders`
- `users`
- `dashboard`

The GraphQL service currently owns a separate in-memory snapshot from the REST service. It is intended for dashboard/read integration in this phase, not as the source of truth for mutations.

## Important Files

- `apps/shell/webpack/webpack.common.js`: host and remote configuration.
- `apps/shell/src/routes/AppRouter.tsx`: protected host routes and lazy remote loading.
- `apps/products/src/App.tsx`: products remote UI.
- `apps/orders/src/App.tsx`: orders remote UI.
- `apps/users/src/App.tsx`: users remote UI.
- `packages/api/src`: shared API client, auth, product, order, and user contracts.
- `packages/ui/src`: production UI atoms and molecules.
- `backend/rest-api/src`: authenticated REST resources and in-memory services.
- `backend/graphql-api/src/server.ts`: GraphQL schema and read resolvers.
- `scripts/check-runtime.mjs`: local endpoint and federation smoke checks.
- `docs/verification-checklist.md`: static, runtime, and browser preflight checklist.

## Validation Baseline

The expected baseline is:

- `pnpm check` passes.
- `pnpm check:runtime` passes when all local services are running.
- `pnpm format:check` passes.
- `pnpm build` passes for the shell, three remotes, REST API, and GraphQL API.
- Browser smoke checks pass for `/products`, `/orders`, and `/users` with no runtime overlay.

Webpack may still report bundle-size recommendations. Those are warnings, not build failures.

## Known Limitations And Next Phases

1. Product, order, user, and GraphQL data are in memory and reset on process restart.
2. REST and GraphQL currently use separate data stores; mutations made through REST are not reflected in GraphQL until a shared repository is introduced.
3. The admin account is hard-coded and there is no persisted user management or invitation flow.
4. The remotes use fixed localhost URLs; production deployment needs environment-driven remote URLs and a deployment manifest.
5. The GraphQL API is read-only and does not yet enforce the REST JWT boundary.
6. There are no automated unit or browser tests yet. The current checks are build, type, formatting, endpoint, federation smoke checks, and a documented manual browser smoke check.
7. Orders do not yet decrement inventory, process payments, or provide fulfillment detail views.
8. The products remote currently covers the core create/list path; edit/delete parity and richer catalog workflows can follow.

## Recommended Next Phase

Introduce a shared persistence layer and repository interfaces first. Then add automated API and browser tests around authentication, product CRUD, order creation, and remote loading. After those contracts are stable, move remote URLs to environment configuration and add CI that runs `pnpm check` plus `pnpm check:runtime` against a started test stack.
