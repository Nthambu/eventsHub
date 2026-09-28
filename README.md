# EventHub - Event Ticketing Platform

A modern, responsive event ticketing platform built with Angular 18. Browse events, purchase tickets, and complete secure checkout with integrated payment processing.

## 🚀 Live Demo

**Live Application:** [https://eventslab-95rj.onrender.com/](https://eventslab-95rj.onrender.com/)

## ✨ Features

- **Event Discovery**: Browse and search through available events with beautiful card layouts
- **Event Details**: View comprehensive event information including venue, date, pricing, and ticket types
- **Ticket Booking**: Select ticket types and quantities with real-time pricing calculations
- **Secure Checkout**: Complete checkout flow with customer information and payment processing
- **Payment Integration**: Integrated with payment gateway for secure transactions
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile
- **Real-time Updates**: Live data updates and instant feedback using toasts and notifications

## 🛠 Tech Stack

### Frontend

- **Framework**: Angular 18 (latest with standalone components)
- **Language**: TypeScript 5.9
- **Styling**: CSS3 with custom properties + Bootstrap 5.3.3
  primeng for icons
- **HTTP Client**: Angular HttpClient with RxJS observables
- **Routing**: Angular Router with lazy loading
- **Forms**: Angular Reactive Forms
- **Notifications**: ngx-toastr
- **Architecture**: Standalone components (no NgModules)

### Development Tools

- **Build System**: Angular CLI with Vite
- **Package Manager**: npm
- **Code Formatting**: Prettier
- **Testing**: Jasmine + Karma
- **Type Checking**: TypeScript strict mode

### Deployment

- **Platform**: Render.com
- **SSR**: Angular Universal (Server-Side Rendering enabled)
- **Build**: Optimized production builds with code splitting

## 📁 Project Structure

```
src/
├── app/
│   ├── app.ts                      # Root component
│   ├── app.routes.ts               # Application routing configuration
│   ├── app.config.ts               # Global providers and configuration
│   │
│   ├── landing-page/               # Home page - event listing
│   │   ├── landing-page.ts         # Event cards, search, filtering
│   │   ├── landing-page.html       # Event grid layout
│   │   └── landing-page.css        # Component styles
│   │
│   ├── event-detail/               # Event details page
│   │   ├── event-detail.ts         # Event info, ticket selection
│   │   ├── event-detail.html       # Event layout and ticket options
│   │   └── event-detail.css        # Event detail styles
│   │
│   ├── checkout/                   # Checkout process
│   │   ├── checkout.ts             # Payment form, customer info
│   │   ├── checkout.html           # Checkout form and summary
│   │   └── checkout.css            # Checkout styling
│   │
│   ├── success/                    # Payment success page
│   │   ├── success.ts              # Success confirmation
│   │   ├── success.html            # Success message and details
│   │   └── success.css             # Success page styling
│   │
│   ├── services/
│   │   └── booking.service.ts      # API calls, state management
│   │
│   ├── data/
│   │   └── events-dto.ts           # TypeScript interfaces and models
│   │
│   └── components/                 # Shared components
│
├── environments/
│   ├── environment.ts              # Development configuration
│   └── environment.prod.ts         # Production configuration
│
├── styles.css                      # Global styles and CSS variables
└── main.ts                         # Application bootstrap
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 8.x or higher

### Installation & Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd eventsFronted/frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env file with your configuration

# 4. Update environment configuration
# Edit src/environments/environment.ts with your backend API URL

# 5. Start development server
npm start / ng serve

# → Application runs at http://localhost:4200
```

### Available Scripts

```bash
# Development
npm start              # Start dev server with hot reload
npm run watch          # Build in watch mode

# Production
npm run build          # Build for production
npm run serve:ssr      # Serve SSR build locally

# Testing
npm test               # Run unit tests
npm run test:watch     # Run tests in watch mode

# Linting & Formatting
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 🎯 Application Flow

### User Journey

1. **Landing Page** (`/`)
   - Browse available events in a responsive grid
   - View event cards with images, dates, venues, and pricing
   - Click "Get Tickets" to navigate to event details

2. **Event Details** (`/event/:id`)
   - View comprehensive event information
   - Select ticket types and quantities
   - See real-time price calculations
   - Proceed to checkout

3. **Checkout** (`/checkout`)
   - Enter customer information (name, email, phone)
   - Review order summary with pricing breakdown
   - Complete secure payment process
   - Redirect to payment gateway

4. **Success** (`/success`)
   - Confirmation of successful payment
   - Order details and next steps
   - Option to return to browse more events

### Key Features in Detail

#### Event Management

- Dynamic event loading from API
- Responsive event cards with gradients and emojis
- Date formatting with timezone support
- Venue and pricing information display

#### Booking System

- Multi-step booking process
- Ticket type selection with quantity controls
- Real-time price calculations including service fees
- Shopping cart state management

#### Payment Processing

- Integrated payment gateway
- Secure customer data handling
- Payment confirmation and receipt
- Error handling and user feedback

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
API_URL=http://localhost:3000/api
PAYMENT_GATEWAY_URL=https://api.paystack.co
NODE_ENV=development
```

### Environment Files

**Development** (`src/environments/environment.ts`):

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
};
```

**Production** (`src/environments/environment.prod.ts`):

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api/v1',
};
```

## 🎨 Styling & Design System

### CSS Custom Properties

The application uses a comprehensive design system with CSS custom properties:

```css
:root {
  /* Colors */
  --primary: #1a56db;
  --success: #059669;
  --warning: #d97706;
  --danger: #dc2626;

  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-size-base: 14px;
  --line-height-base: 1.5;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Border Radius */
  --radius: 8px;
  --radius-lg: 12px;
}
```

### Bootstrap Integration

Bootstrap 5.3.3 is integrated for:

- Responsive grid system
- Form components and validation
- Utility classes for spacing and typography
- Component styles (buttons, cards, modals)

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices with progressive enhancement
- **Breakpoints**: Bootstrap's responsive breakpoint system
- **Touch Friendly**: Optimized for touch interactions on mobile devices
- **Performance**: Optimized images and lazy loading for better mobile performance

## 🚀 Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# Build output will be in dist/frontend/
```

### Deployment on Render.com

The application is configured for deployment on Render with:

1. **Build Command**: `npm install && npm run build`
2. **Start Command**: `npm run serve:ssr:frontend`
3. **Environment**: Node.js 18+
4. **Auto-deploy**: Connected to GitHub for automatic deployments

### Environment Variables for Production

Set these in your Render dashboard:

- `NODE_ENV=production`
- `API_URL=<your-backend-api-url>`

## 🔌 API Integration

### Backend Requirements

The frontend expects the following API endpoints:

```typescript
GET /api/v1/events                    # Get all events
GET /api/v1/events/:id                # Get specific event
POST /api/v1/payments/initialize      # Initialize payment
GET /api/v1/payments/verify/:reference # Verify payment
```

### Data Models

**Event Response Format**:

```json
{
  "id": 1,
  "name": "Summer Music Festival",
  "event_date": "2025-08-15T20:00:00.000Z",
  "venue": "Central Park, New York, NY",
  "image_url": "🎵",
  "description": "Amazing outdoor music festival",
  "ticket_types": [
    {
      "name": "General Admission",
      "price": 75.0,
      "description": "Standard entry ticket"
    },
    {
      "name": "VIP Experience",
      "price": 150.0,
      "description": "VIP access with premium amenities"
    }
  ]
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The application includes unit tests for:

- Components and their interactions
- Services and API calls
- Form validation and user input
- Route navigation and guards

## 🔧 Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **Prettier**: Automatic code formatting
- **ESLint**: Code quality and consistency
- **Naming**: PascalCase for components, camelCase for methods/properties

### Component Architecture

- **Standalone Components**: No NgModules, direct imports
- **Reactive Forms**: For all user input
- **Observable Patterns**: RxJS for async data handling
- **Error Handling**: Comprehensive error handling with user feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Run the linter and tests: `npm run lint && npm test`
5. Commit your changes: `git commit -m 'Add new feature'`
6. Push to the branch: `git push origin feature/new-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:

1. Check the [issues](../../issues) for existing solutions
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs
4. Provide your environment details (OS, Node version, browser)

---

**Built with ❤️ using Angular 18 and modern web technologies**
