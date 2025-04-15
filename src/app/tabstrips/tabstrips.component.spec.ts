import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabstripsComponent } from './tabstrips.component';

describe('TabstripsComponent', () => {
  let component: TabstripsComponent;
  let fixture: ComponentFixture<TabstripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabstripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabstripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
