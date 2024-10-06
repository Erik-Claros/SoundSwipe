import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsService } from '../assets/friends.service';

@Component({
  selector: 'app-friend-button',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './friend-button.component.html',
  styleUrl: './friend-button.component.css'
})
export class FriendButtonComponent implements OnInit{
  
  data: any[] = [];

  isDropdownVisible = false;
  options: any[] = []; // Array to hold the fetched data

  constructor(private friendsService: FriendsService) {}

  ngOnInit() {
    this.friendsService.getData().subscribe((response) => {
      this.data = response; // Assign the fetched data
    });
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  selectOption(option: string) {
    console.log('Selected:', option);
    this.isDropdownVisible = false; // Close the dropdown after selection
  }
}
