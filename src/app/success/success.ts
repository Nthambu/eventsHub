import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService,  } from '../services/booking.service';

@Component({
  selector: 'app-success',
  imports: [CommonModule],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success implements OnInit {
 // booking: BookingData | null = null;
  orderNumber: string = '';
  booking:any;
total:number=10;
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

  // get subtotal(): number {
  //   return this.bookingService.getSubtotal();
  // }

  // get serviceFee(): number {
  //   return this.bookingService.getServiceFee();
  // }

  // get total(): number {
  //   return this.bookingService.getTotal();
  // }

  formatEventDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    const formatted = date.toLocaleDateString('en-US', options);
    return formatted.replace(',', ' ·');
  }

  getVenueShort(venue: string): string {
    if (!venue) return '';
    
    const parts = venue.split(',');
    if (parts.length >= 2) {
      return `${parts[0]}, ${parts[1].trim()}`;
    }
    return venue;
  }

  browseMoreEvents(): void {
    this.router.navigate(['/']);
  }

  printPage(): void {
    window.print();
  }
}
