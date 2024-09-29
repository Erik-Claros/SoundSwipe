import { Component } from '@angular/core';
import { LikeButtonComponent } from '../like-button/like-button.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LikeButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // Correct the typo here
})
export class DashboardComponent {

}
