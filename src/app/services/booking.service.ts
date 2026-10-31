import { Injectable, signal } from '@angular/core';
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

  // ── Signal: carries checkout context from EventDetail → Checkout
  private selectedEventData = signal<any>({});
  public selectedEventData$ = this.selectedEventData.asReadonly();

  // ── Events cache — survives component destruction on route changes
  private eventsCache: EventData[] = [];

  // ── BehaviorSubject: carries confirmed-order context into Success page
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
  ) {}

  // ── State mutations ─────────────────────────────────────────────────────

  /** Called by EventDetail before navigating to /checkout */
  updateCheckoutData(newCheckoutData: any): void {
    this.selectedEventData.set(newCheckoutData);
  }

  /** Called by Checkout after payment is verified, before navigating to /success */
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

  /** Returns cached events list; null means cache is empty (caller should fetch) */
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

  /** Step 1: initialize Paystack transaction — returns authorizationUrl + reference */
  initializePayment(
    paymentRequest: PaymentInitializeRequest,
  ): Observable<PaymentInitializeResponse> {
    return this.http.post<PaymentInitializeResponse>(
      `${this.baseUrl}/checkout/initialize`,
      paymentRequest,
    );
  }

  /** Step 2: called after Paystack redirects back — verifies and saves the order server-side */
  verifyPayment(req: VerifyPaymentRequest): Observable<VerifyPaymentResponse> {
    return this.http.post<VerifyPaymentResponse>(`${this.baseUrl}/checkout/verify`, req);
  }

  // ── Helpers ─────────────────────────────────────────────────────────────

  formatEventDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    const formatted = date.toLocaleDateString('en-US', options);
    return formatted.replace(',', ' ·');
  }

  handleApiError(err: any): void {
    this.toastr.error(
      err?.error?.message || err?.error?.status || 'Server error — please try again.',
      'Oops!',
    );
  }
}
