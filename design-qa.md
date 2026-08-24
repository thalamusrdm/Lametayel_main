# Design QA

## Comparison target

- Source visual truth: `source-home-desktop.png` (captured from `https://insurance.lametayel.co.il/`).
- Browser-rendered implementation: `implementation-home-desktop.png` (captured from `http://localhost:4173/`).
- Combined comparison evidence: `qa-home-desktop-comparison.png` (source left, implementation right).
- Viewport/state: desktop homepage above the fold, 1265 × 712 CSS px, cookie notice visible, service card visible, initial testimonial state.
- Pixel dimensions: source 1265 × 712; implementation 1265 × 712; device scale factor 1; no density normalization required.

## Full-view comparison evidence

The combined comparison shows the same recognizable visual system and composition: orange top rule, white RTL navigation, original Lametayel logo, identical original hero photography, right-aligned white hero copy, gray/green phone pills, orange rounded purchase CTA, floating service card, and cookie notice. The implementation intentionally uses cleaner spacing and updated copy while preserving the trust signals and brand identity requested.

## Focused region comparison evidence

A separate crop was not required because the 1265 × 712 comparison keeps the navigation, logo, hero typography, original hero asset, CTA, service card, and cookie notice legible at 1:1 scale. The purchase flow was inspected separately in the browser at `/buy/step1`, where the live legacy form was visible and interactive inside the new shell.

## Required fidelity surfaces

- Fonts and typography: original Assistant Regular/SemiBold/Bold files are used locally. Heading hierarchy, weights, wrapping, and RTL rendering match the source family. No truncation was observed.
- Spacing and layout rhythm: header height, hero proportion, half-width content placement, pill spacing, and floating panels follow the source. Cards and lower sections use the same broad rhythm with modest modernization.
- Colors and visual tokens: source orange, white, dark gray, green, and blue-gray palette is retained. Contrast remains readable across the hero and dark testimonial section.
- Image quality and asset fidelity: original logo, hero, app, testimonial, feature-icon, service-avatar, phone, and WhatsApp assets were copied locally; there are no hotlinks, placeholders, CSS illustrations, or handmade SVG replacements.
- Copy and content: core insurance messaging, phone numbers, purchase CTA, benefits, app capabilities, and customer reassurance remain aligned with the source.

## Findings

- No actionable P0, P1, or P2 design mismatch remains in the desktop comparison.
- P3: the old header includes a cart glyph that is intentionally omitted from the new header because it is not part of the requested insurance purchase journey.
- P3 test gap: the source site's mobile DOM was verified at 390 × 844, but its screenshot endpoint timed out. The implementation itself was rendered at 390 × 844; responsive navigation, single-column benefits, CTA layout, and the embedded purchase form were verified semantically.

## Comparison history

1. Initial pass: P1 hero placement — the implementation copy occupied the left half and overlapped the phone, unlike the source's right-side copy.
2. Fix: changed the RTL logical padding from inline-start to inline-end and reduced the headline scale to match the source density.
3. Post-fix evidence: `implementation-home-desktop.png` and `qa-home-desktop-comparison.png` show the copy correctly placed on the right with the phone unobstructed.

## Primary interactions tested

- Desktop purchase CTA route.
- Cookie notice dismissal.
- Testimonial tab selection.
- Mobile menu open and close.
- Legacy purchase iframe load.
- Legacy destination combobox selection and reset.
- Mobile purchase form visibility at 390 × 844.

## Console check

The new homepage emitted no app-origin warnings or errors. The proxied legacy iframe emits a Facebook SDK warning only in local HTTP development because that SDK requires HTTPS; the production target is HTTPS.

## Implementation checklist

- Build: passed.
- Sites packaging tests: 4/4 passed.
- Desktop visual comparison: passed.
- Core interactions: passed.
- Embedded legacy form: passed through the development proxy.

## Annotation update — embedded purchase page

- Browser evidence: `implementation-purchase-clean.png`, desktop 1305 × 912.
- Removed the outer purchase heading and help strip so the page begins directly with the form.
- The embedded legacy header, footer, callback panel, and cookie banner are hidden when the legacy page is available through the same-origin proxy.
- A fixed responsive crop remains as a fallback for cross-origin production loading: 772 px desktop and 908 px mobile.
- Verified at 1305 × 912 and 390 × 844. The form heading, all fields, and the “המשך” button remain visible; only the new site footer is rendered.
- Production build passed and Sites packaging tests passed 4/4 after the update.

## Purchase-flow routing fix

- Root cause: the legacy step-1 form posts to `/wizard/process_data?step=1`, which was not proxied. Its response also redirects to an absolute `https://insurance.lametayel.co.il/buy/step2` URL, causing the iframe to leave the local same-origin shell and be blocked by the legacy frame policy.
- Added proxy coverage for `/wizard` and legacy `/buy/step2+` routes while preserving the new shell at `/buy/step1`.
- Rewrote legacy absolute redirect headers back to local paths so every wizard step remains inside the iframe and keeps the same session cookie.
- Verified that `/wizard/process_data?step=1` now returns a local `/buy/step2?...` redirect and that subsequent redirects also remain local.
- Production build passed and Sites packaging tests passed 4/4 after the routing fix.

final result: passed
