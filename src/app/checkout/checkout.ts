import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService, BookingData } from '../services/booking.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  booking: BookingData | null = null;

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.bookingService.booking$.subscribe(booking => {
      this.booking = booking;
      
      // Redirect if no event is selected
      if (!booking.event) {
        this.router.navigate(['/']);
      }
    });
  }

  get subtotal(): number {
    return this.bookingService.getSubtotal();
  }

  get serviceFee(): number {
    return this.bookingService.getServiceFee();
  }

  get total(): number {
    return this.bookingService.getTotal();
  }

  processPayment(): void {
    // Simulate payment processing
    setTimeout(() => {
      this.router.navigate(['/success']);
    }, 1500);
  }
}
