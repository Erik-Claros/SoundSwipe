import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, CommonModule]  // Add FormsModule in app.config or module
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  dob: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router) {}

  onSignup() {
    if (!this.firstName || !this.lastName || !this.dob || !this.email || !this.password){
      this.errorMessage = 'Please fill all fields!!';
      this.showErrorModal();
      return;
    }
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        console.log('User data:', {
          firstName: this.firstName,
          lastName: this.lastName,
          dob: this.dob,
          email: this.email,
        });
        // Redirect to dashboard or login after successful signup
        this.router.navigate(['/dashboard']);  // Or redirect to login page
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = 'This email is already in use. Please use a different email or login.';
        } else {
          this.errorMessage = 'Error: ' + error.message;
        }
         this.showErrorModal();
      });
  }

  showErrorModal() {
    const errorModalElement = document.getElementById('errorModal') as HTMLElement | null;

    if (errorModalElement) {
      const modal = new bootstrap.Modal(errorModalElement);  // Initialize Bootstrap modal
      modal.show();  // Show the modal
    } else {
      console.error("Modal element with ID 'errorModal' not found.");  // Log error if modal is not found
    }
  }
}