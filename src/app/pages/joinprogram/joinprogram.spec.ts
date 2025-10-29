import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinprogramComponent } from './joinprogram';

describe('Joinprogram', () => {
  let component: JoinprogramComponent;
  let fixture: ComponentFixture<JoinprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinprogramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
