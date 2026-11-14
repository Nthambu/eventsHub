import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPage } from './landing-page';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideToastr } from 'ngx-toastr';
import { of } from 'rxjs';
import { BookingService } from '../services/booking.service';
import { EventData } from '../data/events-dto';
import { Router } from '@angular/router';

describe('LandingPage', () => {
  let component: LandingPage;
  let fixture: ComponentFixture<LandingPage>;
  let mockBookingService: jasmine.SpyObj<BookingService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockEventData: EventData = {
    id: '23ee',
    name: 'test',
    image_url: 'test',
    event_date: '2022/2/2',
    description: 'ticko',
    city: 'nairobi',
    state: 'kenya',
    venue: 'kbc',
    ticket_types: [],
    created_at: 'sat',
    updated_at: 'now',
    active: true,
    facebook_url: 'test',
  };

  beforeEach(async () => {
    mockBookingService = jasmine.createSpyObj<BookingService>([
      'getEvents',
      'getCachedEvents',
      'setCachedEvents',
      'handleApiError',
    ]);
    // No cached events so ngOnInit falls through to getEvents()
    mockBookingService.getCachedEvents.and.returnValue(null);
    mockBookingService.getEvents.and.returnValue(of([mockEventData]));

    mockRouter = jasmine.createSpyObj<Router>(['navigate']);

    await TestBed.configureTestingModule({
      imports: [LandingPage],
      providers: [
        provideZonelessChangeDetection(),
        provideToastr(),
        { provide: BookingService, useValue: mockBookingService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch events', () => {
    expect(mockBookingService.getEvents).toHaveBeenCalled();
    expect(component.events).toEqual([mockEventData]);
    expect(mockBookingService.setCachedEvents).toHaveBeenCalledWith([mockEventData]);
  });
});
