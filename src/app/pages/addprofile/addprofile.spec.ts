import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprofileComponent } from './addprofile';

describe('Addprofile', () => {
  let component: AddprofileComponent;
  let fixture: ComponentFixture<AddprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
