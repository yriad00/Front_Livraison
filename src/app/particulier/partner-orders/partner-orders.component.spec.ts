import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerOrdersComponent } from './partner-orders.component';

describe('PartnerOrdersComponent', () => {
  let component: PartnerOrdersComponent;
  let fixture: ComponentFixture<PartnerOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
