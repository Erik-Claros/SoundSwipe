import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../Services/database-service/database-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent implements OnInit{
  
  public users: any[] = [];
  public newUser: any = {uID: 0, first_name: '', last_name: ''};

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getUsers().subscribe({
      next: (response: any[]) => {
        this.users = response;
      },
      error: (error: any) => {
        console.error('Error fetching data', error);
      }
    });
  }

}
