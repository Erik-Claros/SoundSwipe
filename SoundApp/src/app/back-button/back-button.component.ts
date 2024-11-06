import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
  standalone: true,
  imports: [ MatButtonModule, MatIconModule ]
})
export class BackButtonComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['dashboard']); // Redirects to the main page
  }
}