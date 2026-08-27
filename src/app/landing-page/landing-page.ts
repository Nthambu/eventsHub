import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService, EventData } from '../services/booking.service';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  dropdownOpen: string | null = null;
  events: EventData[] = [];

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {
    this.events = this.bookingService.events;
  }

  getTickets(event: EventData): void {
    // Update booking service with selected event
    this.bookingService.updateBooking({ 
      event: event,
      selectedTicketType: event.tickets[0].type,
      quantity: 2
    });
    
    // Navigate to event detail page
    this.router.navigate(['/event', event.id]);
  }

  toggleDropdown(dropdownId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownOpen = this.dropdownOpen === dropdownId ? null : dropdownId;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.dropdownOpen = null;
  }

  onDropdownItemClick(action: string, event: MouseEvent): void {
    event.stopPropagation();
    console.log('Dropdown action:', action);
    this.dropdownOpen = null;
  }
}
