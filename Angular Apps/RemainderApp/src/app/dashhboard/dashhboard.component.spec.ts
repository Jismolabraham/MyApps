import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashhboardComponent } from './dashhboard.component';

describe('DashhboardComponent', () => {
  let component: DashhboardComponent;
  let fixture: ComponentFixture<DashhboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashhboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashhboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
