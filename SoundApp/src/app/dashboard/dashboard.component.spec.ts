import { Component } from '@angular/core';
import { LikeButtonComponent } from "../like-button/like-button.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,  // Ensure this is marked as standalone
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [LikeButtonComponent]
})
export class DashboardComponent {}
