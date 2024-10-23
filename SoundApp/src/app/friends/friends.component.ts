import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../Services/database-service/database-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent implements OnInit{
  
  public data: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getData().subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }
}
