# Madfuns — Official Match Tickets & Live Events in Kenya

A production Angular SSR ticketing platform. Users browse events, select tickets, pay via M-Pesa or card through Paystack, and receive an e-ticket via email.

## Live

**https://madfuns.co.ke**

## Stack

| Layer | Technology |
|---|---|
| Frontend framework | Angular 20.3.x (standalone, zoneless, SSR) |
| SSR server | Express 5 via `@angular/ssr` |
| Styling | CSS3 custom properties + Bootstrap 5.3.3 |
| Notifications | ngx-toastr |
| Backend | NestJS + PostgreSQL |
| Payments | Paystack (full-page redirect flow) |
| Hosting | Render Web Service |
| Domain | Truehost Kenya (`madfuns.co.ke`) |
| DNS | Cloudflare (free) |
| Email | Gmail SMTP via Nodemailer |

## Local Development

```bash
npm install
ng serve
# → http://localhost:4200
```

Backend must be running at `http://localhost:3000` (set in `src/environments/environment.ts`).

## Build & Run SSR Locally

```bash
npm run build
node dist/frontend/server/server.mjs
```

## Project Structure

```
src/app/
├── landing-page/       # Home — event grid, footer, 6-event pagination
├── event-detail/       # Per-event — tickets, share, Google Maps, SEO schema
├── checkout/           # Payment form — Paystack initialization
├── success/            # Post-payment — verification, e-ticket confirmation
├── privacy-policy/     # Terms & Conditions + Privacy Policy
├── refund-policy/      # Refund Policy
├── services/
│   ├── booking.service.ts   # API calls, checkout state (Signal + BehaviorSubject)
│   └── seo.service.ts       # Dynamic title, meta, OG, Twitter, JSON-LD
└── data/
    └── events-dto.ts        # All TypeScript interfaces
```

## Render Deployment

| Field | Value |
|---|---|
| Environment | Node |
| Build command | `npm install --include=dev && npm run build` |
| Start command | `node dist/frontend/server/server.mjs` |
| Node version | `NODE_VERSION=20` |
| `NODE_ENV` | `production` |

`--include=dev` is required because `@angular/cli` is a devDependency.

## SSR Render Modes

| Route | Mode | Reason |
|---|---|---|
| `/` | Server | Fetches events at request time |
| `/event/:id` | Server | Per-event dynamic content |
| `/checkout` | Client | Requires localStorage / browser APIs |
| `/success` | Client | Paystack redirect with query params |
| `/privacy-policy` | Server | Static, SEO-friendly |
| `/refund-policy` | Server | Static, SEO-friendly |

## Zoneless Change Detection Rules

This app uses `provideZonelessChangeDetection()`. Every component that mutates state asynchronously must use `ChangeDetectionStrategy.OnPush` and call `cdr.markForCheck()` after each mutation, or Angular throws `NG0100`.

Use `provideAnimationsAsync()` in `app.config.ts` — **not** `provideAnimations()`. The synchronous version breaks SSR hydration + zoneless navigation.

## Payment Flow

```
EventDetail → BookingService.updateCheckoutData() → /checkout
Checkout → POST /checkout/initialize → { authorizationUrl, reference }
window.location.href = authorizationUrl
User pays → Paystack → callback_url?ref=TKT-xxx
Success reads ref → POST /checkout/verify → saves order → email
Success → router.navigate(['/'])
```

The frontend sends `callbackUrl: window.location.origin + '/success'` with every payment request so multi-frontend setups always redirect to the correct domain.

## SEO

- Static base meta, Open Graph, Twitter Card, Organization JSON-LD in `index.html`
- `SeoService` updates title, description, canonical, and OG tags per route
- Event detail pages inject `Event` JSON-LD schema (Google rich results)
- `public/robots.txt` blocks `/checkout` and `/success`
- `public/sitemap.xml` lists static routes
- Verified in Google Search Console

## Environment Files

**`src/environments/environment.ts`** (development):
```typescript
export const environment = { production: false, baseUrl: 'http://localhost:3000' };
```

**`src/environments/environment.prod.ts`** (production):
```typescript
export const environment = { production: true, baseUrl: 'https://madfuns-backend.onrender.com' };
```

## Running Tests

```bash
# Single spec file (zoneless — no fakeAsync)
npx ng test --include="src/app/path/file.spec.ts" --watch=false --browsers=ChromeHeadless
```

Zone.js is not loaded — `fakeAsync` and `waitForAsync` do not work. Use synchronous patterns with `of()` for HTTP spies.
