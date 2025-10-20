import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Findmentor } from './findmentor';

describe('Findmentor', () => {
  let component: Findmentor;
  let fixture: ComponentFixture<Findmentor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Findmentor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Findmentor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
