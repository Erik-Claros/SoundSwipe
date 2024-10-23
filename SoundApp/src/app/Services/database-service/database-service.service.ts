import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { User } from '../../Models/databaseModel';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  /////////
  private apiUrl = 'http://localhost:5062/api/Database'; 

  constructor(private http: HttpClient) {}

  // Method to get user by name
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
