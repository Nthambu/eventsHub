import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { PaymentInitializeRequest, PaymentInitializeResponse } from '../data/events-dto';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout implements OnInit, OnDestroy {
  checkoutData: any;
  isProcessing = false;
  paymentBreakdown: any = null;
  customerInfoForm!: FormGroup;
  private pageshowHandler?: (event: PageTransitionEvent) => void;

  constructor(
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly bookingService: BookingService,
    private readonly toastr: ToastrService,
    private fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    this.initializeCustomerForm();

    // Reset processing state on load
    this.isProcessing = false;
    // Load active event data (fallback to localStorage if full redirect reloaded the app)
    this.checkoutData = this.bookingService.selectedEventData$?.() ?? null;

    if (isPlatformBrowser(this.platformId)) {
      if (!this.checkoutData || !this.checkoutData.event) {
        const stored = localStorage.getItem('activeCheckoutData');
        if (stored) {
          try {
            this.checkoutData = JSON.parse(stored);
            this.bookingService.updateCheckoutData(this.checkoutData);
          } catch {
            this.checkoutData = null;
          }
        }
      }

      // Handle user returning via browser back-forward cache
      this.pageshowHandler = (event: PageTransitionEvent) => {
        this.isProcessing = false;
      };
      window.addEventListener('pageshow', this.pageshowHandler);

      // Handle explicit Paystack cancellation redirect (?cancelled=true)
      const isCancelled = this.route.snapshot.queryParamMap.get('cancelled') === 'true';
      if (isCancelled) {
        this.isProcessing = false;
        localStorage.removeItem('paymentReference');
        this.toastr.info('Payment was cancelled. You can review your details and try again.');
        // Clean query params from the URL cleanly
        this.router.navigate([], { queryParams: {}, replaceUrl: true });
      }
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

    if (this.checkoutData.customerInfo?.fullName) {
      this.customerInfoForm.patchValue({
        fullName: this.checkoutData.customerInfo.fullName,
        email: this.checkoutData.customerInfo.email,
        phone: this.checkoutData.customerInfo.phone,
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.pageshowHandler) {
      window.removeEventListener('pageshow', this.pageshowHandler);
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
    this.cdr.markForCheck();

    const paymentRequest: PaymentInitializeRequest = {
      eventId: this.checkoutData.event.id,
      ticketTypeIndex: this.getTicketTypeIndex(),
      quantity: this.checkoutData.quantity,
      customerEmail: this.customerInfoForm.value.email.trim(),
      customerName: this.customerInfoForm.value.fullName.trim(),
      customerPhone: this.customerInfoForm.value.phone.trim(),
    };

    const updatedData = {
      ...this.checkoutData,
      customerEmail: paymentRequest.customerEmail,
      customerInfo: {
        fullName: paymentRequest.customerName,
        email: paymentRequest.customerEmail,
        phone: paymentRequest.customerPhone,
      },
    };

    this.bookingService.updateCheckoutData(updatedData);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('activeCheckoutData', JSON.stringify(updatedData));
    }

    this.bookingService.initializePayment(paymentRequest).subscribe({
      next: (response: PaymentInitializeResponse) => {
        this.paymentBreakdown = response.breakdown;

        this.bookingService.updateCheckoutData({
          ...updatedData,
          total: response.breakdown.total,
          currency: response.breakdown.currency,
          breakdown: response.breakdown,
        });

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('paymentReference', response.reference);
          window.location.href = response.authorizationUrl;
          setTimeout(() => {
            this.isProcessing = false;
            this.cdr.markForCheck();
          }, 8000);
        }
      },
      error: (err) => {
        this.isProcessing = false;
        this.cdr.markForCheck();
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
    return this.paymentBreakdown?.currency ?? this.checkoutData?.breakdown?.currency ?? 'KES';
  }
}