import { Component } from '@angular/core';

@Component({
  selector: 'app-dislike',
  standalone: true,
  templateUrl: './dislike.component.html',
  styleUrls: ['./dislike.component.css']
})
export class DislikeComponent {
  message: string = '';
  dislike(){
  console.log('Dislike button clicked!!');
  this.message = 'You disliked this song!';
  }
}