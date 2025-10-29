import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindmentorComponent } from './findmentor';

describe('Findmentor', () => {
  let component: FindmentorComponent;
  let fixture: ComponentFixture<FindmentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindmentorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindmentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
