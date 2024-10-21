import { Component, OnInit } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { FriendsService } from '../Services/friends-service/friends.service';
import { FriendsAttributes } from '../Models/FriendsModel';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-friend-button',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './friend-button.component.html',
  styleUrl: './friend-button.component.css'
})

export class FriendButtonComponent implements OnInit{

  isDropdownVisible = false;
  friends: FriendsAttributes[] = [];

  constructor(private friendsService: FriendsService, private http: HttpClient) {}

  ngOnInit(){
    this.http.get<FriendsAttributes[]>('http://localhost:3000/Friend').subscribe(data => {
      this.friends = data;
      console.log(this.friends);
    })
    //this.friends = this.friendsService.getData(); 
    /*this.friends.forEach(friend => {
      console.log(`Name: ${friend.name}, Tag: ${friend.tag}`);
    }); */
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  selectOption(option: string) {
    console.log('Selected:', option);
    this.isDropdownVisible = false; // Close the dropdown after selection
  }

  keepOrder = () => 0;
}
