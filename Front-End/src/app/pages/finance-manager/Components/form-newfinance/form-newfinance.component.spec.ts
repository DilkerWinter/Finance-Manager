import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewfinanceComponent } from './form-newfinance.component';

describe('FormNewfinanceComponent', () => {
  let component: FormNewfinanceComponent;
  let fixture: ComponentFixture<FormNewfinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewfinanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormNewfinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
