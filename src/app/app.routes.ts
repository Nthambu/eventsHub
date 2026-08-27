import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { EventDetail } from './event-detail/event-detail';
import { Checkout } from './checkout/checkout';
import { Success } from './success/success';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage
    },
    {
        path: 'event/:id',
        component: EventDetail
    },
    {
        path: 'checkout',
        component: Checkout
    },
    {
        path: 'success',
        component: Success
    },
    {
        path: '**',
        redirectTo: ''
    },
];
