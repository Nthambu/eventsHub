import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService, EventData, BookingData } from '../services/booking.service';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  event: EventData | null = null;
  booking: BookingData | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.event = this.bookingService.getEventById(eventId) || null;
    
    if (!this.event) {
      this.router.navigate(['/']);
      return;
    }

    this.bookingService.booking$.subscribe(booking => {
      this.booking = booking;
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

  selectTicketType(type: string): void {
    this.bookingService.updateBooking({ selectedTicketType: type });
  }

  changeQuantity(delta: number): void {
    if (!this.booking) return;
    
    const newQuantity = this.booking.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.bookingService.updateBooking({ quantity: newQuantity });
    }
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  goBackToEvents(): void {
    this.router.navigate(['/']);
  }
}
