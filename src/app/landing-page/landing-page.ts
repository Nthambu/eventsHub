import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { EventData } from '../data/events-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage implements OnInit {
  events: EventData[] = [];
  loading = false;
  currentYear = new Date().getFullYear();

  constructor(
    private readonly bookingService: BookingService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    // Serve from cache instantly on back-navigation; avoids loading flash
    const cached = this.bookingService.getCachedEvents();
    if (cached) {
      this.events = cached;
      return;
    }
    this.getEvents();
  }

  getEvents(): void {
    this.loading = true;
    this.bookingService.getEvents().subscribe({
      next: (res) => {
        this.events = res || [];
        this.bookingService.setCachedEvents(this.events);
        this.loading = false;
        if (this.events.length === 0) {
          this.toastr.info('No events at the moment — check back soon!');
        }
      },
      error: (err) => {
        this.loading = false;
        this.events = [];
        this.bookingService.handleApiError(err);
      },
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
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options).replace(',', ' ·');
  }

  getEventGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg,#1a56db22,#1a56db44)',
      'linear-gradient(135deg,#7c3aed22,#7c3aed44)',
      'linear-gradient(135deg,#dc262622,#dc262644)',
      'linear-gradient(135deg,#05966944,#05966966)',
      'linear-gradient(135deg,#d9770644,#d9770666)',
    ];
    return gradients[index % gradients.length];
  }

  getEventEmoji(index: number): string {
    const emojis = ['🎵', '🎤', '🎉', '🎭', '🎸', '🎪', '🎨', '🎬'];
    return emojis[index % emojis.length];
  }

  getTickets(event: EventData): void {
    this.router.navigate(['/event', event.id], { state: { eventData: event } });
  }
}
