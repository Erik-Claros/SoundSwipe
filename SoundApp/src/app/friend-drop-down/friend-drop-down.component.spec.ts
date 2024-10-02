import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendDropDownComponent } from './friend-drop-down.component';

describe('FriendDropDownComponent', () => {
  let component: FriendDropDownComponent;
  let fixture: ComponentFixture<FriendDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendDropDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
