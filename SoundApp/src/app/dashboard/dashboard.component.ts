import { Component } from '@angular/core';
import { DislikeComponent } from '../dislike/dislike.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DislikeComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent {

}
