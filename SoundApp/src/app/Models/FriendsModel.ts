export class FriendsAttributes {
    public name!: string;
    public tag!: string;

    /*foreach() {

    }*/
  }

export interface User {
    uid: number;
    phone: string;
    firstName: string;
    lastName: string;
    spotifyLink?: string; // Optional property
  }