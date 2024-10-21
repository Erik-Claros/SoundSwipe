import { Injectable } from '@angular/core';
//import { Converters } from '../Models/FriendsModel';



@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  friends: Object[] = [];
  friendNames: Array<String> = [];
  constructor() {}

  getData() {

    //this.friends = friendData;
    //this.friendNames = this.friends.map(friend => friend.name);
    return this.friendNames;
  }

  /*getNames(): Array<String> {
    this.friendNames.map(friends => friends.name)
    return this.friendNames;
  } */
}

