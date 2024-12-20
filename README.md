<img width="250px" src="https://neon.tech/brand/neon-logo-dark-color.svg" />

# Neon Authorize + PropelAuth Example

A quick start template demonstrating secure user authentication and authorization using Neon Authorize with PropelAuth integration.

## Features

- Next.js application with TypeScript
- User authentication powered by PropelAuth
- Row-level security using Neon Authorize
- Database migrations with Drizzle ORM
- Ready-to-deploy configuration for Vercel, Netlify, and Render

## Prerequisites

- [Neon](https://neon.tech) account with a new project
- [PropelAuth](https://www.propelauth.com) account with a new application
- Node.js 18+ installed locally

## One-Click Deploy

Deploy directly to your preferred hosting platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/neondatabase-labs/propelauth-nextjs-neon-authorize&env=DATABASE_URL,DATABASE_AUTHENTICATED_URL,NEXT_PUBLIC_AUTH_URL,PROPELAUTH_API_KEY,PROPELAUTH_VERIFIER_KEY,PROPELAUTH_REDIRECT_URI&project-name=neon-authorize-propelauth&repository-name=neon-authorize-propelauth)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/neondatabase-labs/propelauth-nextjs-neon-authorize)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/neondatabase-labs/propelauth-nextjs-neon-authorize)

> **Important**: After deployment, set `PROPELAUTH_REDIRECT_URI` to your deployment URL and add it to "Additional Frontend Locations" in the PropelAuth dashboard.

## Local Development Setup

### 1. Configure PropelAuth

1. Navigate to your PropelAuth dashboard
2. Under "Frontend Integration", configure:
   - Application URL: `http://localhost:3000`
   - Default redirect path after login: `/api/auth/callback`
   - Default redirect path after logout: `/api/auth/logout`

![PropelAuth Frontend Integration](/images/propelauth-frontend-integration-page.png)

### 2. Set Up Neon Authorize

1. Open your Neon Console and click "Authorize"
2. Add a new authentication provider
3. Set the JWKS URL to: `{YOUR_PROPEL_AUTH_URL}/.well-known/jwks.json`
   > Replace `{YOUR_PROPEL_AUTH_URL}` with your PropelAuth URL

![Neon Authorize Add Auth Provider](/images/neon-authorize-add-auth-provider.png)

### 3. Local Installation

1. Clone the repository:

```bash
git clone https://github.com/neondatabase-labs/propelauth-nextjs-neon-authorize
cd propelauth-nextjs-neon-authorize
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

![Neon Authorize + PropelAuth Example](/images/neon-authorize-propelauth-example.png)

For more detailed examples of how to implement client-side and server-side row-level security independently, please visit the dedicated pages: `/client-side` and `/server-side`.

## Important: Production Setup

> **Note**: Before deploying to production, you must transition from a demo to a live PropelAuth environment:

1. In your PropelAuth dashboard, click "Go Live"
2. Set up the required DNS records for your domain as specified in PropelAuth's dashboard
3. Update your environment variables with the new production credentials
4. Update your authentication configuration in Neon Authorize with the new JWKS URL

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
