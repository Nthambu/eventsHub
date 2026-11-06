import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
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
export class Checkout implements OnInit {
  checkoutData: any;
  isProcessing = false;
  paymentBreakdown: any = null;
  customerInfoForm!: FormGroup;

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

    // If the user pressed browser-back after a Paystack redirect, there may be
    // a stale reference in localStorage — clear it so the page is fresh.
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('paymentReference');
    }

    // Ensure processing state is never inherited from a previous session
    this.isProcessing = false;

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

    // Restore form values if the user had already filled them (came back from Paystack cancel)
    if (this.checkoutData.customerInfo?.fullName) {
      this.customerInfoForm.patchValue({
        fullName: this.checkoutData.customerInfo.fullName,
        email: this.checkoutData.customerInfo.email,
        phone: this.checkoutData.customerInfo.phone,
      });
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
    // Prefer the explicit index stored by EventDetail
    if (this.checkoutData?.selectedTicketIndex !== undefined) {
      return this.checkoutData.selectedTicketIndex;
    }
    // Fallback: find by type string
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

    // Persist email in checkout context so Success page can display it
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

        // Merge updated total from server breakdown into checkout context
        this.bookingService.updateCheckoutData({
          ...this.bookingService.selectedEventData$(),
          total: response.breakdown.total,
          currency: response.breakdown.currency,
          breakdown: response.breakdown,
        });

        // Store reference for the callback URL fallback
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('paymentReference', response.reference);
        }

        if (isPlatformBrowser(this.platformId)) {
          // Full-page redirect to Paystack — page will unload
          window.location.href = response.authorizationUrl;
          // Safety net: if the redirect is slow, don't leave the button spinning
          setTimeout(() => { this.isProcessing = false; }, 8000);
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

  /** Template helper */
  getTotal(): number {
    return this.paymentBreakdown?.total ?? this.checkoutData?.total ?? 0;
  }

  getCurrency(): string {
    return this.paymentBreakdown?.currency ?? this.checkoutData?.breakdown?.currency ?? 'USD';
  }
}
