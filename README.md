<img width="250px" src="https://neon.tech/brand/neon-logo-dark-color.svg" />

# Neon RLS + PropelAuth Example (SQL from the Frontend and Backend)

A quick start Next.js template demonstrating secure user authentication and authorization using Neon RLS with PropelAuth integration. This guide primarily uses SQL from the backend to enforce row-level security policies, while also showcasing how to implement client-side row-level security as an example.

## Features

- Next.js application with TypeScript
- User authentication powered by PropelAuth
- Row-level security using Neon RLS
- Database migrations with Drizzle ORM
- Ready-to-deploy configuration for Vercel, Netlify, and Render

## Prerequisites

- [Neon](https://neon.tech) account with a new project
- [PropelAuth](https://www.propelauth.com) account with a new application
- Node.js 18+ installed locally

## One-Click Deploy

Deploy directly to your preferred hosting platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/neondatabase-labs/propelauth-nextjs-neon-rls&env=DATABASE_URL,DATABASE_AUTHENTICATED_URL,NEXT_PUBLIC_AUTH_URL,PROPELAUTH_API_KEY,PROPELAUTH_VERIFIER_KEY,PROPELAUTH_REDIRECT_URI&project-name=neon-rls-propelauth&repository-name=neon-rls-propelauth)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/neondatabase-labs/propelauth-nextjs-neon-rls)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/neondatabase-labs/propelauth-nextjs-neon-rls)

> **Important**: After deployment, set `PROPELAUTH_REDIRECT_URI` to your deployment URL and add it to "Additional Frontend Locations" in the PropelAuth dashboard.

## Local Development Setup

### Configure PropelAuth

1. Navigate to your PropelAuth dashboard
2. Under "Frontend Integration", configure:
   - Application URL: `http://localhost:3000`
   - Default redirect path after login: `/api/auth/callback`
   - Default redirect path after logout: `/api/auth/logout`

      ![PropelAuth Frontend Integration](/images/propelauth-frontend-integration-page.png)

### Set Up Neon RLS

1. Open your Neon Console and click on "RLS" under the "Settings" Tab.
2. Add a new authentication provider
3. Set the JWKS URL to: `{YOUR_PROPEL_AUTH_URL}/.well-known/jwks.json`
   
   > Replace `{YOUR_PROPEL_AUTH_URL}` with your PropelAuth URL
   
   ![Neon RLS Add Auth Provider](/images/neon-rls-add-auth-provider.png)

4. Follow the steps in the UI to setup the roles for Neon RLS. You should ignore the schema related steps if you're following this guide.
5. Note down the connection strings for both the **`neondb_owner` role** and the **`authenticated, passwordless` role**. You'll need both. The `neondb_owner` role has full privileges and is used for migrations, while the `authenticated` role will be used by the application and will have its access restricted by RLS.
   
   ![Neon RLS Connection Strings](/images/neon-rls-env-values.png)

### Local Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/neondatabase-labs/propelauth-nextjs-neon-rls
   cd propelauth-nextjs-neon-rls
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file with the following variables:

   ```env
   # Database connections
   DATABASE_URL=              # neondb_owner role connection
   DATABASE_AUTHENTICATED_URL= # authenticated role connection

   # PropelAuth configuration
   NEXT_PUBLIC_AUTH_URL=
   PROPELAUTH_API_KEY=
   PROPELAUTH_VERIFIER_KEY=
   PROPELAUTH_REDIRECT_URI="http://localhost:3000/api/auth/callback"
   ```

   > Get your PropelAuth keys from the "Backend Integration" tab:
   > ![PropelAuth Backend Integration](/images/propelauth-backend-integration-page.png)

4. Set up the database:

   ```bash
   npm run drizzle:generate  # Generate migrations
   npm run drizzle:migrate  # Apply migrations
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit `http://localhost:3000` to see the application running

   ![Neon RLS + PropelAuth Example](/images/neon-rls-propelauth-example.png)

For comprehensive examples on implementing row-level security independently on the client-side (SQL from the frontend) and server-side (SQL from the backend), please visit the respective pages: `/client-side` and `/server-side`.

## Important: Production Setup

> **Note**: Before deploying to production, you must transition from a demo to a live PropelAuth environment:

1. In your PropelAuth dashboard, click "Go Live"
2. Set up the required DNS records for your domain as specified in PropelAuth's dashboard
3. Update your environment variables with the new production credentials
4. Update your authentication configuration in Neon RLS with the new JWKS URL

## Learn More

- [Neon RLS Tutorial](https://neon.tech/docs/guides/neon-rls-tutorial)
- [Simplify RLS with Drizzle](https://neon.tech/docs/guides/neon-rls-drizzle)
- [PropelAuth + Neon RLS](https://neon.tech/docs/guides/neon-rls-propelauth)

## Authors

- [Dhanush Reddy](https://github.com/dhanushreddy291)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
