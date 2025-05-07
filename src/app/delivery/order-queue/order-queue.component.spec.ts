import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderQueueComponent } from './order-queue.component';

describe('OrderQueueComponent', () => {
  let component: OrderQueueComponent;
  let fixture: ComponentFixture<OrderQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderQueueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
