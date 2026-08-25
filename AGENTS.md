# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

## Durable product decisions

- The legacy purchase wizard must feel like a native page inside the new site shell. Show only the legacy form content; hide its header, introductory title block, support strip, cookie banner, and footer so those elements are not duplicated.
- Informational content from the legacy insurance site should live on local routes inside the new site shell. Keep only transactional legacy systems as clearly labeled external or proxied destinations.
- Content and information pages should read like credible editorial articles: use a strong, locally hosted documentary-style lead image that matches the topic, and reuse the same visual language in information-center cards without decorative clutter or third-party hotlinks.
- Insurance guides must be maintained as current, source-backed editorial content: lead with a direct answer, show the review date and official sources, avoid unconditional coverage claims, expose useful FAQs, and ship route-specific prerendered metadata/content for SEO and answer engines. Remove obsolete event-specific articles instead of keeping them as archives.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
