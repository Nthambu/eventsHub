import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { EventDetail } from './event-detail/event-detail';
import { Checkout } from './checkout/checkout';
import { Success } from './success/success';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'event/:id',
    component: EventDetail,
  },
  {
    path: 'checkout',
    component: Checkout,
  },
  /**
   * Paystack callback URL — the backend sets:
   *   callback_url = FRONTEND_URL/success?ref=TKT-xxx
   * Angular's router exposes `?reference` and `?trxref` as query params
   * which Success component reads via ActivatedRoute.
   */
  {
    path: 'success',
    component: Success,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
