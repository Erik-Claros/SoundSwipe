import { Component } from '@angular/core';

@Component({
  selector: 'app-like-button',
  standalone: true,
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent {
  
  buttonAction() {
    console.log("Like button has been clicked");
  }
}