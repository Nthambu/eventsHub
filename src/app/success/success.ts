import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { Subscription } from 'rxjs';

type PageState = 'verifying' | 'success' | 'failed' | 'no-data';

@Component({
  selector: 'app-success',
  imports: [CommonModule],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success implements OnInit, OnDestroy {
  pageState: PageState = 'verifying';
  errorMessage = '';

  orderNumber = '';
  total = 0;
  currency = 'USD';
  booking: any = null;

  private sub?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    // Query params are available on both server and browser
    const ref =
      this.route.snapshot.queryParamMap.get('reference') ||
      this.route.snapshot.queryParamMap.get('trxref') ||
      // localStorage is browser-only
      (isPlatformBrowser(this.platformId) ? localStorage.getItem('paymentReference') : null);

    if (!ref) {
      this.pageState = 'no-data';
      return;
    }

    this.verifyPayment(ref);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private verifyPayment(reference: string): void {
    this.pageState = 'verifying';

    this.sub = this.bookingService.verifyPayment({ reference }).subscribe({
      next: (res) => {
        this.orderNumber = res.orderNumber;

        const ctx = this.bookingService.selectedEventData$();
        this.booking = ctx && ctx.event ? ctx : null;
        this.total = ctx?.total ?? 0;
        this.currency = ctx?.breakdown?.currency ?? ctx?.currency ?? 'USD';

        if (ctx?.event) {
          this.bookingService.updateBookingConfirmation({
            event: ctx.event,
            selectedTicketType: ctx.selectedTicketType,
            quantity: ctx.quantity,
            customerInfo: ctx.customerInfo ?? { fullName: '', email: ctx.customerEmail ?? '', phone: '' },
            orderNumber: res.orderNumber,
            total: ctx.total,
            currency: this.currency,
            paymentReference: reference,
          });
        }

        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('paymentReference');
        }
        this.pageState = 'success';
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message ?? err?.message ?? 'Payment verification failed.';
        this.pageState = 'failed';
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('paymentReference');
        }
      },
    });
  }

  formatEventDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const opts: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', opts);
  }

  browseMoreEvents(): void {
    this.router.navigate(['/']);
  }

  tryAgain(): void {
    this.router.navigate(['/checkout']);
  }

  retryPayment(): void {
    this.router.navigate(['/']);
  }

  printPage(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.print();
    }
  }
}
