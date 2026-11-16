import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'event/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client,
  },
  {
    // Paystack redirects here with query params (?ref=, ?trxref=, ?reference=).
    // Must be Client-rendered — SSR/Prerender cannot handle dynamic query params
    // and a static server will 404 on unknown query strings.
    path: 'success',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
