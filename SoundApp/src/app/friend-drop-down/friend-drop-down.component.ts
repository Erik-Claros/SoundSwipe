import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friend-drop-down',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './friend-drop-down.component.html',
  styleUrl: './friend-drop-down.component.css'
})
export class FriendDropDownComponent {
  selectedValue: string = '';
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
}
