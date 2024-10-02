import { Component } from '@angular/core';
import { FriendDropDownComponent } from "../friend-drop-down/friend-drop-down.component";


@Component({
  selector: 'app-friend-button',
  standalone: true,
  imports: [ FriendDropDownComponent ],
  templateUrl: './friend-button.component.html',
  styleUrl: './friend-button.component.css'
})
export class FriendButtonComponent {
  dropdownAction() {
    console.log("Friends button has been clicked");
  }
}
