import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondosComponent } from './condos.component';

describe('CondosComponent', () => {
  let component: CondosComponent;
  let fixture: ComponentFixture<CondosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
