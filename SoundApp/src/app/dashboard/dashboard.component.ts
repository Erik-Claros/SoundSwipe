import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { TrackComponent } from '../track-component/track-component.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    NavBarComponent,
    MatButtonModule, 
    TrackComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  backgroundImageUrl: string = '';

  onBackgroundImageUrlReceived(url: string) {
    this.backgroundImageUrl = url;
  }

  ngAfterViewInit(): void {
  }
}
