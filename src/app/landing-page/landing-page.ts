import { Component, HostListener, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { EventData } from '../data/events-dto';
import { ToastrService } from 'ngx-toastr';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage implements OnInit{
  dropdownOpen: string | null = null;
  events: EventData[] = [];
  loading: boolean = false; 
  constructor(
    private readonly bookingService: BookingService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getEvents();
  }
  getEvents(): void {
    this.loading = true; 
     this.bookingService.getEvents().subscribe({
      next: (res) => {
        this.events = res || []; 
        this.loading = false;
        if (this.events.length === 0) {
          this.toastr.info('', 'No events at the moment!');
        }
      },
      error: (err) => {
        this.loading = false;
        this.events = []; // Clear events on error
        this.bookingService.handleApiError(err);
      }
    });
  }
  formatEventDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    const formatted = date.toLocaleDateString('en-US', options);
    // Convert "Wed, Aug 15, 8:00 PM" format
    return formatted.replace(',', ' ·');
  }

  getEventGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, #1a56db22, #1a56db44)', // Blue
      'linear-gradient(135deg, #7c3aed22, #7c3aed44)', // Purple  
      'linear-gradient(135deg, #dc262622, #dc262644)', // Red
      'linear-gradient(135deg, #059669aa, #059669cc)', // Green
      'linear-gradient(135deg, #d97706aa, #d97706cc)', // Orange
    ];
    return gradients[index % gradients.length];
  }

  getEventEmoji(index: number): string {
    const emojis = ['🎵', '🎤', '🎉', '🎭', '🎸', '🎪', '🎨', '🎬'];
    return emojis[index % emojis.length];
  }

  getTickets(event: EventData): void {
    // Navigate to event detail page with event data in state
    this.router.navigate(['/event', event.id], {
      state: { eventData: event }
    });
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
    this.dropdownOpen = null;
  }
}
