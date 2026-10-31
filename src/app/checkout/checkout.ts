import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { PaymentInitializeRequest, PaymentInitializeResponse } from '../data/events-dto';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit, OnDestroy {
  checkoutData: any;
  isProcessing = false;
  paymentBreakdown: any = null;
  customerInfoForm!: FormGroup;

  // Bound reference kept so we can removeEventListener on destroy
  private readonly onPageShow = (e: PageTransitionEvent) => {
    // persisted=true means the page was restored from bfcache
    // persisted=false means a normal load — ngOnInit already ran, skip
    if (e.persisted) {
      this.isProcessing = false;
    }
  };

  constructor(
    public readonly router: Router,
    private readonly bookingService: BookingService,
    private readonly toastr: ToastrService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    this.initializeCustomerForm();
    this.checkoutData = this.bookingService.selectedEventData$();

    // Always reset on init — covers normal navigation and hard reloads
    this.isProcessing = false;

    if (isPlatformBrowser(this.platformId)) {
      // bfcache restore: browser back from Paystack brings the frozen page back
      // with isProcessing still true — pageshow fires and resets it
      window.addEventListener('pageshow', this.onPageShow);

      // Also clear any stale reference left from the previous attempt
      localStorage.removeItem('paymentReference');
    }

    if (!this.checkoutData || !this.checkoutData.event) {
      this.toastr.warning('Please select an event first', 'No event selected');
      this.router.navigate(['/']);
      return;
    }

    this.paymentBreakdown = {
      subtotal: this.checkoutData.subtotal || 0,
      serviceFee: this.checkoutData.serviceFee || 0,
      total: this.checkoutData.total || 0,
    };

    // Restore form values if customer already filled them before being sent to Paystack
    if (this.checkoutData.customerInfo?.fullName) {
      this.customerInfoForm.patchValue({
        fullName: this.checkoutData.customerInfo.fullName,
        email: this.checkoutData.customerInfo.email,
        phone: this.checkoutData.customerInfo.phone,
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('pageshow', this.onPageShow);
    }
  }

  initializeCustomerForm(): void {
    this.customerInfoForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+\d][\d\s\-()]{6,}$/)]],
      policyStatus: [false, Validators.requiredTrue],
    });
  }

  private getTicketTypeIndex(): number {
    if (this.checkoutData?.selectedTicketIndex !== undefined) {
      return this.checkoutData.selectedTicketIndex;
    }
    if (!this.checkoutData?.event || !this.checkoutData.selectedTicketType) return 0;
    const idx = this.checkoutData.event.ticket_types.findIndex(
      (t: any) => t.type === this.checkoutData.selectedTicketType,
    );
    return Math.max(idx, 0);
  }

  processPayment(): void {
    this.customerInfoForm.markAllAsTouched();

    if (this.customerInfoForm.invalid) {
      if (this.customerInfoForm.get('policyStatus')?.invalid) {
        this.toastr.error('Please agree to the refund policy to continue.');
      }
      return;
    }

    if (!this.checkoutData?.event) {
      this.toastr.error('No event data found — please go back and select an event.');
      return;
    }

    this.isProcessing = true;

    const paymentRequest: PaymentInitializeRequest = {
      eventId: this.checkoutData.event.id,
      ticketTypeIndex: this.getTicketTypeIndex(),
      quantity: this.checkoutData.quantity,
      customerEmail: this.customerInfoForm.value.email.trim(),
      customerName: this.customerInfoForm.value.fullName.trim(),
      customerPhone: this.customerInfoForm.value.phone.trim(),
    };

    // Persist customer info in context so the Success page can display it
    this.bookingService.updateCheckoutData({
      ...this.checkoutData,
      customerEmail: paymentRequest.customerEmail,
      customerInfo: {
        fullName: paymentRequest.customerName,
        email: paymentRequest.customerEmail,
        phone: paymentRequest.customerPhone,
      },
    });

    this.bookingService.initializePayment(paymentRequest).subscribe({
      next: (response: PaymentInitializeResponse) => {
        this.paymentBreakdown = response.breakdown;

        this.bookingService.updateCheckoutData({
          ...this.bookingService.selectedEventData$(),
          total: response.breakdown.total,
          currency: response.breakdown.currency,
          breakdown: response.breakdown,
        });

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('paymentReference', response.reference);
          // Navigate to Paystack — page unloads immediately in normal conditions.
          // The pageshow listener above handles the bfcache restore case.
          window.location.href = response.authorizationUrl;
        }
      },
      error: (err) => {
        this.isProcessing = false;
        const msg = err?.error?.message ?? 'Payment initialization failed — please try again.';
        this.toastr.error(msg, 'Payment error');
      },
    });
  }

  goBack(): void {
    if (this.checkoutData?.event?.id) {
      this.router.navigate(['/event', this.checkoutData.event.id]);
    } else {
      this.router.navigate(['/']);
    }
  }

  getTotal(): number {
    return this.paymentBreakdown?.total ?? this.checkoutData?.total ?? 0;
  }

  getCurrency(): string {
    return this.paymentBreakdown?.currency ?? this.checkoutData?.breakdown?.currency ?? 'USD';
  }
}
