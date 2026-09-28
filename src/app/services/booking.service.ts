import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingData, EventData, PaymentInitializeRequest, PaymentInitializeResponse } from '../data/events-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly baseUrl: string = environment.baseUrl;
  private selectedEventData = signal<any>({});

  //  Exposing a read-only version for components to safely consume
  public selectedEventData$ = this.selectedEventData.asReadonly();

  constructor(private http: HttpClient, private readonly toastr: ToastrService) {}

  // methods to update the state
  updateCheckoutData(newCheckoutData: any): void {
    this.selectedEventData.set(newCheckoutData);
  }
  getCurrentBooking(): BookingData {
    return this.bookingData.value;
  }

  private readonly bookingData = new BehaviorSubject<BookingData>({
    event: null,
    selectedTicketType: 'General',
    quantity: 2,
    customerInfo: {
      fullName: '',
      email: '',
      phone: ''
    },
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  });

  booking$ = this.bookingData.asObservable();

  updateBooking(updates: Partial<BookingData>): void {
    const current = this.bookingData.value;
    this.bookingData.next({ ...current, ...updates });
  }

  getEvents(): Observable<EventData[]> {
    return this.http.get<EventData[]>(`${this.baseUrl}/events`);
  }

  getEventById(id: string): Observable<EventData> {
    return this.http.get<EventData>(`${this.baseUrl}/events/${id}`);
  }

  submitBooking(bookingData: BookingData): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings`, bookingData);
  }

  // Payment API method
  initializePayment(paymentRequest: PaymentInitializeRequest): Observable<PaymentInitializeResponse> {
    return this.http.post<PaymentInitializeResponse>(`${this.baseUrl}/checkout/initialize`, paymentRequest);
  }
 

  generateOrderNumber(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'TKT-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Helper method to format event date for display
  formatEventDate(dateString: string): string {
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
  handleApiError(err:any){
     this.toastr.error('oops!',err.error.message || err.error.status || 
        'server error! Please try again'
      )
  }
}