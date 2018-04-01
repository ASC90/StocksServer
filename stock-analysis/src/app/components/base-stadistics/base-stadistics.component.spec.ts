import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseStadisticsComponent } from './base-stadistics.component';

describe('BaseStadisticsComponent', () => {
  let component: BaseStadisticsComponent;
  let fixture: ComponentFixture<BaseStadisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseStadisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseStadisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
