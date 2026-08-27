import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService, BookingData } from '../services/booking.service';

@Component({
  selector: 'app-success',
  imports: [CommonModule],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success implements OnInit {
  booking: BookingData | null = null;
  orderNumber: string = '';

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
    
    this.orderNumber = this.bookingService.generateOrderNumber();
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

  browseMoreEvents(): void {
    this.router.navigate(['/']);
  }

  printPage(): void {
    window.print();
  }
}
