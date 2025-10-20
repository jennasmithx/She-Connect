import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addprofile } from './addprofile';

describe('Addprofile', () => {
  let component: Addprofile;
  let fixture: ComponentFixture<Addprofile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addprofile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addprofile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
