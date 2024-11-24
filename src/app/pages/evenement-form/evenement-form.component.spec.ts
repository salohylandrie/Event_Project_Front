import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementFormComponent } from './evenement-form.component';

describe('EvenementFormComponent', () => {
  let component: EvenementFormComponent;
  let fixture: ComponentFixture<EvenementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenementFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
