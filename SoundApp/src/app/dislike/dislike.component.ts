import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dislike',
  standalone: true,
  templateUrl: './dislike.component.html',
  styleUrls: ['./dislike.component.css']
})
export class DislikeComponent {
  @Output() click = new EventEmitter<void>();

  dislikeClicked() {
    this.click.emit();
  }
}