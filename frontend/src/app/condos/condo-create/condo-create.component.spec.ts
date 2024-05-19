import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondoCreateComponent } from './condo-create.component';

describe('CondoCreateComponent', () => {
  let component: CondoCreateComponent;
  let fixture: ComponentFixture<CondoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondoCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CondoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
