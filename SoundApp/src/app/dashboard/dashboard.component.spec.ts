import { Component } from '@angular/core';
import { ShareButtonComponent } from "../share-button/share-button.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,  // Ensure this is marked as standalone
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [ShareButtonComponent]
})
export class DashboardComponent {}
