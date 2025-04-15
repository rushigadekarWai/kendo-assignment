import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EzQuoteComponent } from './ez-quote.component';

describe('EzQuoteComponent', () => {
  let component: EzQuoteComponent;
  let fixture: ComponentFixture<EzQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EzQuoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EzQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
