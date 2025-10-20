import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Joinprogram } from './joinprogram';

describe('Joinprogram', () => {
  let component: Joinprogram;
  let fixture: ComponentFixture<Joinprogram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Joinprogram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Joinprogram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
