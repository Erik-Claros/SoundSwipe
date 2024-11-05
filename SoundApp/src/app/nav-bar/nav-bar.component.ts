import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
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
    //console.log("Account button has been clicked");
    this.router.navigate(['/account']);
  }
  friendClicked() {
    //console.log("Friends button has been clicked");
    this.router.navigate(['/friend']);
  }
  likedSongClicked() {
    //console.log("Like button has been clicked");
    this.router.navigate(['/liked']);
  }
  historyClicked() {
    //console.log("History button has been clicked");
    this.router.navigate(['/history']);
  }
  settingClicked() {
    //console.log("Setting button has been clicked");
    this.router.navigate(['/settings']);
  }
}
