import { Component, OnInit, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  activeEvent: EventData | null = null;
  eventId: string | null = null;
  selectedTicketIndex: number = 0;        // track by index — unambiguous
  selectedTicketType: string = '';         // kept for checkout compatibility
  selectedTicketDetails: TicketType | null = null;
  quantity: number = 1;
    @Input() shareUrl: string = '';
  @Input() shareTitle: string = 'Check out this event!';
  
  copiedToClipboard = false;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private bookingService: BookingService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');

    // history is a browser-only API — guard against SSR
    let stateEventData: EventData | null = null;
    if (isPlatformBrowser(this.platformId)) {
      stateEventData =
        this.router.getCurrentNavigation()?.extras?.state?.['eventData'] ??
        (history.state?.eventData ?? null);
    }

    if (stateEventData && stateEventData.id === this.eventId) {
      this.activeEvent = stateEventData;
      this.initializeTicketSelection();
    } else {
      this.getEventFromAPI();
    }
  }

  private initializeTicketSelection(): void {
    if (this.activeEvent?.ticket_types?.length) {
      this.selectTicketByIndex(0);
    }
    // Set share metadata from the loaded event
    if (isPlatformBrowser(this.platformId)) {
      this.shareUrl = window.location.href;
    }
    if (this.activeEvent) {
      this.shareTitle = `${this.activeEvent.name} — get your tickets now!`;
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
    // Use selectedTicketDetails directly — already set by selectTicketByIndex()
    return (this.selectedTicketDetails?.price ?? 0) * this.quantity;
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
  selectTicketByIndex(index: number): void {
    const ticket = this.activeEvent?.ticket_types?.[index];
    if (!ticket) return;
    this.selectedTicketIndex = index;
    this.selectedTicketType = ticket.type;
    this.selectedTicketDetails = ticket;
  }

  selectTicketType(type: string): void {
    const index = this.activeEvent?.ticket_types?.findIndex(t => t.type === type) ?? 0;
    this.selectTicketByIndex(index);
  }

  changeQuantity(delta: number): void {
    const newQuantity = this.quantity + delta;
    const maxQuantity = this.selectedTicketDetails?.quantity || 10;
    
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      this.quantity = newQuantity;
    }
  }

  proceedToCheckout(): void {
    const checkoutData = {
      event: this.activeEvent,
      selectedTicketType: this.selectedTicketType,
      selectedTicketIndex: this.selectedTicketIndex,
      quantity: this.quantity,
      subtotal: this.getSubtotal(),
      serviceFee: this.getServiceFee(),
      total: this.getTotal(),
      ticketDetails: this.selectedTicketDetails,
    };
    this.bookingService.updateCheckoutData(checkoutData);
    this.router.navigate(['/checkout']);
  }
openInGoogleMaps(): void {
  const event = this.activeEvent;
  const place = event?.location || event?.venue;

  if (!place) return;

  const encodedPlace = encodeURIComponent(place);
  const googleMapsUrl = `https://google.com/maps/search/?api=1&query=${encodedPlace}`;

  window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
}
share(platform: 'facebook' | 'whatsapp' | 'linkedin' | 'x' | 'email' | 'instagram'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const url = this.shareUrl || window.location.href;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(this.shareTitle);
    let targetUrl = '';

    switch (platform) {
      case 'facebook':
        targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'whatsapp':
        targetUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'linkedin':
        targetUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'x':
        targetUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`;
        return;
      case 'instagram':
        this.copyForInstagram();
        return;
    }

    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  }

  private copyForInstagram(): void {
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      this.copiedToClipboard = true;
      setTimeout(() => (this.copiedToClipboard = false), 3000);
    });
  }
  goBackToEvents(): void {
    this.router.navigate(['/']);
  }
}
