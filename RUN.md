# How to Run the Application

## Prerequisites

Make sure you have:
- Node.js installed (version 20.19.0 or >=22.12.0)
- npm installed
- `.env` file in the project root (already created)

## Local Development

### Option 1: Using npm scripts (Recommended)

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

Vite automatically loads environment variables from your `.env` file!

### Option 2: Using npm start

```bash
npm start
```

(This is an alias for `npm run dev`)

## Production Build

### Build the application

```bash
npm run build
```

This will:
- Type-check your code
- Build and optimize the application
- Create a `dist` folder with production-ready files

### Preview the production build

```bash
npm run preview
```

This serves the built files at `http://localhost:4173`

## Docker

### Build and Run

```bash
# Make sure .env file exists with your credentials
docker-compose up -d --build
```

Access at `http://localhost:3000`

The Docker setup automatically reads from your `.env` file and builds a production-optimized image with nginx.

### Stop Docker Container

```bash
docker-compose down
```

## Environment Variables

Your `.env` file contains:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

**Important Notes:**
- Vite only exposes variables prefixed with `VITE_` to your code
- Environment variables are embedded at **build time** for production builds
- For Docker builds, make sure `.env` exists before running `docker-compose up`

## Troubleshooting

### Environment variables not working?

1. Make sure `.env` is in the project root (same level as `package.json`)
2. Restart the dev server after changing `.env`
3. Check variable names start with `VITE_`
4. Verify `.env` file format (no spaces around `=`)

### Port already in use?

- Change the port in `vite.config.ts` or use: `npm run dev -- --port 3001`

### Build fails?

- Make sure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be 20.19.0+ or 22.12.0+)
