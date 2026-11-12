import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  BookingData,
  EventData,
  PaymentInitializeRequest,
  PaymentInitializeResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from '../data/events-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly baseUrl: string = environment.baseUrl;

  // Signal: carries checkout context from EventDetail → Checkout → Success
  private selectedEventData = signal<any>(this.getInitialCheckoutData());
  public selectedEventData$ = this.selectedEventData.asReadonly();

  // Cache events to eliminate loading flash on return
  private eventsCache: EventData[] = [];

  private readonly bookingData = new BehaviorSubject<BookingData>({
    event: null,
    selectedTicketType: 'General',
    quantity: 1,
    customerInfo: { fullName: '', email: '', phone: '' },
    billingAddress: { street: '', city: '', state: '', zip: '' },
  });
  booking$ = this.bookingData.asObservable();

  constructor(
    private http: HttpClient,
    private readonly toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  private getInitialCheckoutData(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem('activeCheckoutData');
        return stored ? JSON.parse(stored) : {};
      } catch {
        return {};
      }
    }
    return {};
  }

  // ── State mutations ─────────────────────────────────────────────────────

  updateCheckoutData(newCheckoutData: any): void {
    this.selectedEventData.set(newCheckoutData);
    if (isPlatformBrowser(this.platformId) && newCheckoutData) {
      try {
        localStorage.setItem('activeCheckoutData', JSON.stringify(newCheckoutData));
      } catch (e) {
        console.warn('Could not cache checkout data to localStorage', e);
      }
    }
  }

  clearCheckoutData(): void {
    this.selectedEventData.set({});
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('activeCheckoutData');
      localStorage.removeItem('paymentReference');
    }
  }

  updateBookingConfirmation(data: Partial<BookingData>): void {
    const current = this.bookingData.value;
    this.bookingData.next({ ...current, ...data });
  }

  updateBooking(updates: Partial<BookingData>): void {
    const current = this.bookingData.value;
    this.bookingData.next({ ...current, ...updates });
  }

  getCurrentBooking(): BookingData {
    return this.bookingData.value;
  }

  // ── API calls ───────────────────────────────────────────────────────────

  getEvents(): Observable<EventData[]> {
    return this.http.get<EventData[]>(`${this.baseUrl}/events`);
  }

  getCachedEvents(): EventData[] | null {
    return this.eventsCache.length > 0 ? this.eventsCache : null;
  }

  setCachedEvents(events: EventData[]): void {
    this.eventsCache = events;
  }

  getEventById(id: string): Observable<EventData> {
    return this.http.get<EventData>(`${this.baseUrl}/events/${id}`);
  }

  submitBooking(bookingData: BookingData): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings`, bookingData);
  }

  initializePayment(
    paymentRequest: PaymentInitializeRequest,
  ): Observable<PaymentInitializeResponse> {
    return this.http.post<PaymentInitializeResponse>(
      `${this.baseUrl}/checkout/initialize`,
      paymentRequest,
    );
  }

  verifyPayment(req: VerifyPaymentRequest): Observable<VerifyPaymentResponse> {
    return this.http.post<VerifyPaymentResponse>(`${this.baseUrl}/checkout/verify`, req);
  }

  // ── Helpers ─────────────────────────────────────────────────────────────

  formatEventDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options).replace(',', ' ·');
  }

  handleApiError(err: any): void {
    this.toastr.error(
      err?.error?.message || err?.error?.status || 'Server error — please try again.',
      'Notice',
    );
  }
}