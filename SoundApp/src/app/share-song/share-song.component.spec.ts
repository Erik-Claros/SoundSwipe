import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSongComponent } from './share-song.component';

describe('ShareSongComponent', () => {
  let component: ShareSongComponent;
  let fixture: ComponentFixture<ShareSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareSongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
