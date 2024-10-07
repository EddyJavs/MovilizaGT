import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchRoutePage } from './search-route.page';

describe('SearchRoutePage', () => {
  let component: SearchRoutePage;
  let fixture: ComponentFixture<SearchRoutePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
