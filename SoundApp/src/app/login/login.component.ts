import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'; //to use ngModel i needed to import FormsModule

import { Router } from '@angular/router';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router){}

  onLogin() {

    if (!this.email || !this.password) {
      alert('Please enter both email and password!');
      return;
    }

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        // Redirect to dashboard after successful login
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert('User not found. Please check your email or sign up.');
        } else if (error.code === 'auth/wrong-password') {
          alert('Incorrect password. Please try again.');
        } else {
          alert('Error: ' + error.message);
        }
      });  
   }
   
  }

  