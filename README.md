# Lametayel Insurance

Responsive Hebrew insurance website built with React and Vite. The legacy purchase wizard is displayed inside the new site shell through a same-origin proxy so all purchase steps keep their session and remain embeddable.

## Local development

```bash
npm install
npm run dev
```

The Vite development server proxies the legacy purchase routes to `https://insurance.lametayel.co.il`.

## Vercel deployment

1. Import this repository into Vercel.
2. Keep the project root as the Root Directory.
3. Vercel reads `vercel.json`, runs `npm run build:vercel`, and publishes `dist/client`.
4. The `api/legacy.js` serverless function proxies the legacy wizard, assets, cookies, POST bodies, and redirects through the deployment domain.

No environment variables are required for the current configuration.

## Verification

```bash
npm run build:vercel
npm run test:sites
```
