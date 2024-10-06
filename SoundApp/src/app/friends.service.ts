import { Injectable } from '@angular/core';
import * as data from '../assets/friends.json'

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private friendsJson = data;
  constructor() { }

  getData() {
    return this.friendsJson;
  }
}
