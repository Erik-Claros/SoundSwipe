import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth, signOut, updateProfile, updateEmail, updatePassword, User } from '@angular/fire/auth';
import { BackButtonComponent } from '../back-button/back-button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AudioService } from '../Services/audio-service/audio.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  standalone: true,
  imports: [MatToolbarModule,NavBarComponent, ReactiveFormsModule, BackButtonComponent, CommonModule] // Import ReactiveFormsModule here
})
export class AccountComponent implements OnInit {
  user: User | null = null;
  accountForm: FormGroup;
  showSuccessMessage =false;

  constructor(private auth: Auth, private fb: FormBuilder, private router: Router, private audioService: AudioService) {
    this.accountForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    if (this.auth.currentUser) {
      this.user = this.auth.currentUser;
      this.accountForm.patchValue({
        displayName: this.user.displayName,
        email: this.user.email
      });
    }
  }

  updateAccount(): void {
    if (this.user) {
      const { displayName, email, password } = this.accountForm.value;

      // Update Display Name
      if (displayName && displayName !== this.user.displayName) {
        updateProfile(this.user, { displayName }).catch(error => {
          console.error('Error updating display name:', error);
        });
      }

      // Update Email
      if (email && email !== this.user.email) {
        updateEmail(this.user, email).catch(error => {
          console.error('Error updating email:', error);
        });
      }

      // Update Password (optional)
      if (password) {
        updatePassword(this.user, password).catch(error => {
          console.error('Error updating password:', error);
        });
      }
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000); 
    }
  }
    logout(): void {
      this.audioService.triggerLogout();
      signOut(this.auth)
        .then(() => {
          this.router.navigate(['/login']); // Redirect to login page or homepage after logout
        })
        .catch(error => console.error('Logout error:', error));
  }
  }

