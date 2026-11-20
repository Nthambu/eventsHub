import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { EventData } from '../data/events-dto';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage implements OnInit {
  events: EventData[] = [];
  loading = false;
  currentYear = new Date().getFullYear();
  readonly pageSize = 6;
  showAll = false;

  constructor(
    private readonly bookingService: BookingService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly cdr: ChangeDetectorRef,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Official Match Tickets & Live Events in Kenya',
      description: 'Buy official tickets for football matches, concerts and live events in Kenya. Secure checkout via M-Pesa and card. Instant e-ticket delivery.',
      url: 'https://madfuns.com/',
    });
    const cached = this.bookingService.getCachedEvents();
    if (cached && cached.length > 0) {
      this.events = cached;
      return;
    }
    this.getEvents();
  }

  getEvents(): void {
    this.loading = true;
    this.cdr.markForCheck();
    this.bookingService.getEvents().subscribe({
      next: (res) => {
        this.events = res || [];
        this.bookingService.setCachedEvents(this.events);
        this.loading = false;
        if (this.events.length === 0) {
          this.toastr.info('No events at the moment — check back soon!');
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.events = [];
        this.bookingService.handleApiError(err);
        this.cdr.markForCheck();
      },
    });
  }

  isMatchEvent(event: EventData): boolean {
    const text = (event.name + ' ' + (event.venue || '')).toLowerCase();
    return text.includes('bayern') || text.includes('ajax') || text.includes('talanta') || text.includes('vs');
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
      'linear-gradient(135deg,#0f172a,#1e3a8a)',
      'linear-gradient(135deg,#1e1b4b,#312e81)',
      'linear-gradient(135deg,#1e293b,#0f172a)',
    ];
    return gradients[index % gradients.length];
  }

  getEventEmoji(index: number): string {
    const emojis = ['⚽', '🏟️', '🎟️', '🏆'];
    return emojis[index % emojis.length];
  }

  getTickets(event: EventData): void {
    this.router.navigate(['/event', event.id], { state: { eventData: event } });
  }

  visibleEvents(): EventData[] {
    return this.showAll ? this.events : this.events.slice(0, this.pageSize);
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.cdr.markForCheck();
  }
}