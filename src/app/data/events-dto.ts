export interface EventData {
  id: string;
  name: string;
  image_url: string;
  event_date: string;
  description: string;
  city: string;
  state: string;
  venue: string;
  ticket_types: TicketType[];
  created_at: string;
  updated_at: string;
  active: boolean;
  facebook_url: string;
}

export interface TicketType {
  type: string;
  price: number;
  description: string;
  quantity: number;
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
  // Populated after verification
  orderNumber?: string;
  total?: number;
  currency?: string;
  paymentReference?: string;
}

// ── Payment API interfaces ───────────────────────────────────────────────────

export interface PaymentInitializeRequest {
  eventId: string;
  ticketTypeIndex: number;
  quantity: number;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
}

export interface PaymentInitializeResponse {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
  breakdown: {
    ticketType: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
    serviceFee: number;
    total: number;
    currency: string;
  };
}

export interface VerifyPaymentRequest {
  reference: string;
  customerPhone?: string;
  billingAddress?: string;
}

export interface VerifyPaymentResponse {
  orderId: string;
  orderNumber: string;
  alreadyProcessed?: boolean;
}
