import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtAgencyComponent } from './govt-agency.component';

describe('GovtAgencyComponent', () => {
  let component: GovtAgencyComponent;
  let fixture: ComponentFixture<GovtAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GovtAgencyComponent]
    });
    fixture = TestBed.createComponent(GovtAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
