import { Component } from '@angular/core';


@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [],
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.css'
})
export class ShareButtonComponent {
  openShareMenu() {
    if (navigator.share) {
      navigator.share({
        title: 'SoundSwipe',
        text: 'Check out this song I found on SoundSwipe!',
        url: 'https://SoundSwipe.com'
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
      }
    else {
       console.log('Web Share API is not supported in your browser');
    }
  }
}