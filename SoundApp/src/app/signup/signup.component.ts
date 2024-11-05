import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';
import { updateProfile } from 'firebase/auth';


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
    .then((userCredential) => {
      const user = userCredential.user;

      // Update the user's profile to include first name and last name
      updateProfile(user, {
        displayName: `${this.firstName} ${this.lastName}`  // Combine first and last name
      }).then(() => {
        console.log('User profile updated with name:', `${this.firstName} ${this.lastName}`);
        
        // Redirect to dashboard or login after successful signup
        this.router.navigate(['/login']);
      }).catch((error) => {
        console.error('Error updating user profile:', error);
      });

    }).catch((error) => {
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