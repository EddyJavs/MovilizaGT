import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestedTripsPage } from './requested-trips.page';

describe('RequestedTripsPage', () => {
  let component: RequestedTripsPage;
  let fixture: ComponentFixture<RequestedTripsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedTripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
