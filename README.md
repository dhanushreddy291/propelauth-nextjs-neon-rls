# Neon Authorize + PropelAuth Example (SQL from the Backend)

This repository is a guided getting started example for Neon Authorize + PropelAuth

1. Create a Neon project
2. Create a PropelAuth application
3. Set up the `Application URL`, `Default redirect path after login` and `Default redirect path after logout` to `http://localhost:3000`, `/api/auth/callback` and `/api/auth/logout` respectively in the PropelAuth dashboard
4. Go to the Neon Console, and click "Authorize" to access the Neon Authorize configuration UI
5. Add a new authentication provider, and use `{YOUR_PROPEL_AUTH_URL}/.well-known/jwks.json` as the JWKS URL (replace `{YOUR_PROPEL_AUTH_URL}` with your actual PropelAuth URL)
6. Follow the steps in the UI to setup the roles for Neon Authorize. You should ignore the schema related steps if you're following this guide
7. Clone this repository and run `npm install`
8. Create a `.env` file in the root of this project and add the following:

```
# For the `neondb_owner` role.
DATABASE_URL=
# For the `authenticated`, passwordless role.
DATABASE_AUTHENTICATED_URL=

NEXT_PUBLIC_AUTH_URL=
PROPELAUTH_API_KEY=
PROPELAUTH_VERIFIER_KEY=
PROPELAUTH_REDIRECT_URI="http://localhost:3000/api/auth/callback"
```

9. Run `npm run drizzle:generate` to generate the migrations
9. Run `npm run drizzle:migrate` to apply the migrations
10. Run `npm run dev` or `bun run dev`
11. Open your browser and go to `http://localhost:3000`
12. Login and play around!
