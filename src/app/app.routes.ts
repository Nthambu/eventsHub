import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { EventDetail } from './event-detail/event-detail';
import { Checkout } from './checkout/checkout';
import { Success } from './success/success';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { RefundPolicy } from './refund-policy/refund-policy';

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
  {
    path: 'success',
    component: Success,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy,
  },
  {
    path: 'refund-policy',
    component: RefundPolicy,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
