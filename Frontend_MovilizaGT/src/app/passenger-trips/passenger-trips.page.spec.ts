import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerTripsPage } from './passenger-trips.page';

describe('PassengerTripsPage', () => {
  let component: PassengerTripsPage;
  let fixture: ComponentFixture<PassengerTripsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerTripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
