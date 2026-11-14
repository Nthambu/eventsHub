import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

type PageState = 'verifying' | 'success' | 'failed' | 'no-data';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success implements OnInit, OnDestroy {
  pageState: PageState = 'verifying';
  errorMessage = '';

  orderNumber = '';
  total = 0;
  currency = 'KES';
  booking: any = null;
  paymentReference = '';

  private sub?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private readonly toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    const ref =
      this.route.snapshot.queryParamMap.get('ref') ||
      this.route.snapshot.queryParamMap.get('reference') ||
      this.route.snapshot.queryParamMap.get('trxref') ||
      (isPlatformBrowser(this.platformId) ? localStorage.getItem('paymentReference') : null);

    if (!ref) {
      this.pageState = 'no-data';
      return;
    }

    this.paymentReference = ref;

    // Retrieve active booking data
    let ctx = this.bookingService.selectedEventData$();
    if ((!ctx || !ctx.event) && isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem('activeCheckoutData');
        if (stored) {
          ctx = JSON.parse(stored);
          this.bookingService.updateCheckoutData(ctx);
        }
      } catch (e) {
        ctx = null;
      }
    }

    this.booking = ctx && ctx.event ? ctx : null;
    this.total = ctx?.total ?? 0;
    this.currency = ctx?.breakdown?.currency ?? ctx?.currency ?? 'KES';

    this.verifyPayment(ref);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private verifyPayment(reference: string): void {
    this.pageState = 'verifying';

    // Pass optional customerPhone so the backend can use it if Paystack metadata is missing
    const phone = this.booking?.customerInfo?.phone ?? this.booking?.customerPhone ?? undefined;

    this.sub = this.bookingService.verifyPayment({ reference, customerPhone: phone }).subscribe({
      next: (res: any) => {
        this.orderNumber = res?.orderNumber || res?.order_number || reference;

        if (this.booking?.event) {
          this.bookingService.updateBookingConfirmation({
            event: this.booking.event,
            selectedTicketType: this.booking.selectedTicketType,
            quantity: this.booking.quantity,
            customerInfo: this.booking.customerInfo ?? {
              fullName: '',
              email: this.booking.customerEmail ?? '',
              phone: '',
            },
            orderNumber: this.orderNumber,
            total: this.total,
            currency: this.currency,
            paymentReference: reference,
          });
        }

        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('paymentReference');
          localStorage.removeItem('activeCheckoutData'); // clean up after confirmed order
        }
        this.pageState = 'success';
        this.toastr.success('Your official e-ticket voucher has been emailed');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message ?? err?.message ?? 'Payment verification failed. Please contact support.';
        this.pageState = 'failed';
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('paymentReference');
        }
      },
    });
  }

  /**
   * Dynamically checks if the current booking is a sports/stadium match
   */
  isSportsEvent(): boolean {
    if (!this.booking?.event) return false;
    const text = `${this.booking.event.name} ${this.booking.event.venue || ''}`.toLowerCase();
    return text.includes('vs') || text.includes('stadium') || text.includes('bayern') || text.includes('ajax') || text.includes('cup');
  }

  getEventVenue(): string {
    return this.booking?.event?.venue || 'Venue to be confirmed';
  }

  getEventName(): string {
    return this.booking?.event?.name || 'Confirmed Event Booking';
  }

  formatEventDate(dateString: string): string {
    if (!dateString) return 'Date specified on e-ticket';
    const date = new Date(dateString);
    const opts: Intl.DateTimeFormatOptions = {
      weekday: 'short',
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
    this.bookingService.clearCheckoutData();
    this.router.navigate(['/']);
  }

  tryAgain(): void {
    this.router.navigate(['/checkout']);
  }

  printPage(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.print();
    }
  }
}