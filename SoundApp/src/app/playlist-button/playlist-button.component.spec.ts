import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistButtonComponent } from './playlist-button.component';

describe('PlaylistButtonComponent', () => {
  let component: PlaylistButtonComponent;
  let fixture: ComponentFixture<PlaylistButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
