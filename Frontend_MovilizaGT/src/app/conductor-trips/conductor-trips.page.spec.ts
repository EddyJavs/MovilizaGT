import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorTripsPage } from './conductor-trips.page';

describe('ConductorTripsPage', () => {
  let component: ConductorTripsPage;
  let fixture: ComponentFixture<ConductorTripsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorTripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
