import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { PaymentInitializeRequest, PaymentInitializeResponse } from '../data/events-dto';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  // Checkout data from signal (initialized in ngOnInit)
  checkoutData: any;
  
  // Payment state
  isProcessing = false;
  paymentBreakdown: any = null;
  
  // Customer info (you can make these editable later)
  customerInfo = {
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 312 555 0100'
  };
customerInfoForm!:FormGroup;
  constructor(
    public readonly router: Router,
    private readonly bookingService: BookingService,
    private readonly toastr: ToastrService,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeCustomerForm();
    // Initialize checkout data from signal
    this.checkoutData = this.bookingService.selectedEventData$();
    
    console.log('Checkout data:', this.checkoutData);
    
    // Check if we have checkout data
    if (!this.checkoutData || !this.checkoutData.event) {
      console.log('No checkout data found, redirecting to home');
      this.toastr.warning('No event selected', 'Please select an event first');
      this.router.navigate(['/']);
      return;
    }

    // Calculate breakdown from checkout data
    this.calculateBreakdown();
  }
initializeCustomerForm():void{
this.customerInfoForm=this.fb.group({
  fullName:['',Validators.required],
  email:['',Validators.required],
  phone:['',Validators.required]

})
}
  private calculateBreakdown(): void {
    if (this.checkoutData) {
      this.paymentBreakdown = {
        subtotal: this.checkoutData.subtotal || 0,
        serviceFee: this.checkoutData.serviceFee || 0,
        total: this.checkoutData.total || 0
      };
    }
  }

  private getTicketTypeIndex(): number {
    if (!this.checkoutData || !this.checkoutData.event || !this.checkoutData.selectedTicketType) return 0;
    
    // Find the index of the selected ticket type in the event's ticket_types array
    const ticketIndex = this.checkoutData.event.ticket_types.findIndex(
      (ticket: any) => ticket.type === this.checkoutData.selectedTicketType
    );
    
    console.log('Selected ticket type:', this.checkoutData.selectedTicketType);
    console.log('Available ticket types:', this.checkoutData.event.ticket_types);
    console.log('Ticket index:', ticketIndex);
    
    return ticketIndex >= 0 ? ticketIndex : 0;
  }

  processPayment(): void {
    if (!this.checkoutData || !this.checkoutData.event) {
      this.toastr.error('No event data found');
      return;
    }

    this.isProcessing = true;
    
    // Prepare payment request
    const paymentRequest: PaymentInitializeRequest = {
      eventId: this.checkoutData.event.id,
      ticketTypeIndex: this.getTicketTypeIndex(),
      quantity: this.checkoutData.quantity,
      customerEmail: this.customerInfo.email,
      customerName: this.customerInfo.fullName,
      customerPhone: this.customerInfo.phone
    };

    console.log('Payment request:', paymentRequest);

    // Initialize payment
    this.bookingService.initializePayment(paymentRequest).subscribe({
      next: (response: PaymentInitializeResponse) => {
        console.log('Payment initialization response:', response);
        
        // Update payment breakdown with server response
        this.paymentBreakdown = response.breakdown;
        
        // Store payment reference for later use
        localStorage.setItem('paymentReference', response.reference);
        
        // Redirect to Paystack
        window.location.href = response.authorizationUrl;
      },
      error: (error) => {
        console.error('Payment initialization failed:', error);
        this.isProcessing = false;
        this.toastr.error('Payment initialization failed', 'Please try again');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/event', this.checkoutData?.event?.id]);
  }
}