import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodedPropertiesComponent } from './decoded-properties.component';

describe('DecodedPropertiesComponent', () => {
  let component: DecodedPropertiesComponent;
  let fixture: ComponentFixture<DecodedPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecodedPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecodedPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
