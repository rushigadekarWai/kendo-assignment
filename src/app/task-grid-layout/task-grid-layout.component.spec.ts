import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGridLayoutComponent } from './task-grid-layout.component';

describe('TaskGridLayoutComponent', () => {
  let component: TaskGridLayoutComponent;
  let fixture: ComponentFixture<TaskGridLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskGridLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskGridLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
