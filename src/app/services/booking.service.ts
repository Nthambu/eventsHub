import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TicketType {
  type: string;
  price: number;
  description: string;
}

export interface EventData {
  id: number;
  title: string;
  emoji: string;
  date: string;
  location: string;
  tickets: TicketType[];
  gradient: string;
}

export interface BookingData {
  event: EventData | null;
  selectedTicketType: string;
  quantity: number;
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingData = new BehaviorSubject<BookingData>({
    event: null,
    selectedTicketType: 'GA',
    quantity: 2,
    customerInfo: {
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 312 555 0100'
    },
    billingAddress: {
      street: '123 Main St',
      city: 'Chicago',
      state: 'IL',
      zip: '60601'
    }
  });

  booking$ = this.bookingData.asObservable();

  events: EventData[] = [
    {
      id: 1,
      title: 'Summer Rooftop Party',
      emoji: '🎵',
      date: 'Saturday, August 15, 2025 · 8:00 PM',
      location: 'Skyline Lounge, Chicago, IL',
      tickets: [
        { type: 'GA', price: 25.00, description: 'General Admission' },
        { type: 'VIP', price: 75.00, description: 'VIP Experience' }
      ],
      gradient: 'linear-gradient(135deg, #1a56db22, #1a56db44)'
    },
    {
      id: 2,
      title: 'Comedy Night Live',
      emoji: '🎤',
      date: 'Friday, September 5, 2025 · 7:00 PM',
      location: 'Laugh Factory, New York, NY',
      tickets: [
        { type: 'Standard', price: 35.00, description: 'Standard Seating' }
      ],
      gradient: 'linear-gradient(135deg, #7c3aed22, #7c3aed44)'
    },
    {
      id: 3,
      title: 'New Year\'s Eve Gala',
      emoji: '🎉',
      date: 'Wednesday, December 31, 2025 · 9:00 PM',
      location: 'Grand Ballroom, Miami, FL',
      tickets: [
        { type: 'Early Bird', price: 99.00, description: 'Early Bird Special' },
        { type: 'Table', price: 299.00, description: 'Reserved Table' }
      ],
      gradient: 'linear-gradient(135deg, #dc262622, #dc262644)'
    }
  ];

  updateBooking(updates: Partial<BookingData>): void {
    const current = this.bookingData.value;
    this.bookingData.next({ ...current, ...updates });
  }

  getCurrentBooking(): BookingData {
    return this.bookingData.value;
  }

  getEventById(id: number): EventData | undefined {
    return this.events.find(event => event.id === id);
  }

  getSubtotal(): number {
    const booking = this.getCurrentBooking();
    if (!booking.event) return 0;
    
    const ticket = booking.event.tickets.find(t => t.type === booking.selectedTicketType);
    return (ticket?.price || 0) * booking.quantity;
  }

  getServiceFee(): number {
    return this.getSubtotal() * 0.0796;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getServiceFee();
  }

  generateOrderNumber(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'TKT-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}