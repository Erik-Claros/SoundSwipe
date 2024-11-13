import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'; //to use ngModel i needed to import FormsModule

import { Router } from '@angular/router';
import {Auth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence} from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('500ms ease-in')]),
      transition(':leave', [animate('500ms ease-out')])
    ])
  ]  
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  displayName: string = '';
  showWelcomeMessage = false;

  constructor(private auth: Auth, private router: Router){}

  onLogin() {

    if (!this.email || !this.password) {
      alert('Please enter both email and password!');
      return;
    }
    this.auth.setPersistence(browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(this.auth, this.email, this.password);
      })
      .then((userCredential) => {
        this.errorMessage = '';
        const user = userCredential.user;
        this.displayName = user.displayName || 'User';

        this.showWelcomeMessage = true;

        setTimeout(() => {
          this.showWelcomeMessage = false;
          this.router.navigate(['/dashboard']);
        },2000);
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

  