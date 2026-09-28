import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { EventData, TicketType } from '../data/events-dto';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  // Event data
  activeEvent: EventData | null = null;
  eventId: string | null = null;
  selectedTicketType: string = '';
  selectedTicketDetails: TicketType | null = null;
  quantity: number = 1; // Default quantity is 1
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    //  get event data from router state first
    const navigation = this.router.getCurrentNavigation();
    const eventData = navigation?.extras?.state?.['eventData'] || 
                     history.state?.eventData;

    if (eventData) {
      // Event data passed via router state
      this.activeEvent = eventData;
      this.initializeTicketSelection();
    } else {
      // Fallback: fetch event data from API if not passed via state
      this.getEventFromAPI();
    }
  }

  private initializeTicketSelection(): void {
    if (this.activeEvent && this.activeEvent.ticket_types && this.activeEvent.ticket_types.length > 0) {
      // Pre-select the first ticket type from API response
      const firstTicket = this.activeEvent.ticket_types[0];
      this.selectedTicketType = firstTicket.type;
      this.selectedTicketDetails = firstTicket;
    }
  }

  private getEventFromAPI(): void {
    if (!this.eventId) {
      this.router.navigate(['/']);
      return;
    }

    this.bookingService.getEventById(this.eventId).subscribe({
      next: (event) => {
        this.activeEvent = event;
        this.initializeTicketSelection();
      },
      error: (err) => {
        this.router.navigate(['/']);
      }
    });
  }

  // Calculation methods
  getSubtotal(): number {
    if (!this.activeEvent || !this.selectedTicketType) return 0;
    
    const selectedTicket = this.getTicketTypes().find(t => 
      t.type === this.selectedTicketType
    );
    
    return (selectedTicket?.price || 0) * this.quantity;
  }

  getServiceFee(): number {
    // Platform fee is  zero 
    return 0;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getServiceFee();
  }

  // Event display methods
  formatEventDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    return date.toLocaleDateString('en-US', options);
  }

  getEventGradient(): string {
    if (!this.activeEvent) return 'linear-gradient(135deg, #1a56db22, #1a56db44)';
    
    // Generate gradient based on event ID since API doesn't provide one
    const gradients = [
      'linear-gradient(135deg, #1a56db22, #1a56db44)', // Blue
      'linear-gradient(135deg, #7c3aed22, #7c3aed44)', // Purple  
      'linear-gradient(135deg, #dc262622, #dc262644)', // Red
      'linear-gradient(135deg, #059669aa, #059669cc)', // Green
      'linear-gradient(135deg, #d97706aa, #d97706cc)', // Orange
    ];
    
    // Use hash of event ID to get consistent gradient
    const hash = this.activeEvent.id.split('-')[0];
    const index = parseInt(hash.substring(0, 2), 16) % gradients.length;
    return gradients[index];
  }

  getEventCity(): string {
    if (!this.activeEvent) return 'the city';
    return this.activeEvent.city || 'the city';
  }

  getTicketTypes(): TicketType[] {
    if (!this.activeEvent) return [];
    return this.activeEvent.ticket_types || [];
  }

  getTicketDescription(ticketType: string): string {
    const ticket = this.getTicketTypes().find(t => t.type === ticketType);
    return ticket?.description || 'Special access';
  }

  getSelectedTicketDetails(): TicketType | null {
    if (!this.selectedTicketType) return null;
    return this.getTicketTypes().find(t => t.type === this.selectedTicketType) || null;
  }

  // User interaction methods
  selectTicketType(type: string): void {
    this.selectedTicketType = type;
    this.selectedTicketDetails = this.activeEvent?.ticket_types?.find(r => r.type === type) || null;
  }

  changeQuantity(delta: number): void {
    const newQuantity = this.quantity + delta;
    const maxQuantity = this.selectedTicketDetails?.quantity || 10;
    
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      this.quantity = newQuantity;
    }
  }

  proceedToCheckout(): void {
    // Prepare checkout data
    const checkoutData = {
      event: this.activeEvent,
      selectedTicketType: this.selectedTicketType,
      quantity: this.quantity,
      subtotal: this.getSubtotal(),
      serviceFee: this.getServiceFee(),
      total: this.getTotal(),
      ticketDetails: this.getSelectedTicketDetails()
    };
    
    // Update the signal with checkout data
    this.bookingService.updateCheckoutData(checkoutData);
    this.router.navigate(['/checkout']);
  }

  goBackToEvents(): void {
    this.router.navigate(['/']);
  }
}