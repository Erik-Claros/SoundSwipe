import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'; //to use ngModel i needed to import FormsModule
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router){}

  onLogin() {
    console.log('Logging in with username: ${this.username}'); //for now, assuming any username and password works

    this.router.navigate(['/dashboard']);// After clicking on the submit button it navigates to the dashboard page
  }

}
