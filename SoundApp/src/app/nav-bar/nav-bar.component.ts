import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ]
})
export class NavBarComponent {
  
  constructor(private router: Router){}

  accountClicked() {
    this.router.navigate(['/account']);
  }

  friendClicked() {
    this.router.navigate(['/friend']);
  }

  likedSongClicked() {
    this.router.navigate(['/liked']);
  }

  historyClicked() {
    this.router.navigate(['/history']);
  }

  settingClicked() {
    this.router.navigate(['/settings']);
  }

  requestClicked() {
    console.log("Request button has been clicked");
    // Navigate to the appropriate page if necessary
  }

  // These methods handle the specific submenu clicks for Friend Requests
  receivedRequestsClicked() {
    console.log('Received Friend Requests clicked');
    // Handle received requests action
  }

  sentRequestsClicked() {
    console.log('Sent Friend Requests clicked');
    // Handle sent requests action
  }

  pendingRequestsClicked() {
    console.log('Pending Friend Requests clicked');
    // Handle pending requests action
  }
}
