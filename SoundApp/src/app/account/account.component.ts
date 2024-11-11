import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-account-window',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    NavBarComponent
  ]
})
export class AccountComponent {

  constructor(private dialog: MatDialog) {}

  // openAccountDialog() {
  //   const dialogRef = this.dialog.open(AccountComponent, {
  //     width: '400px',
  //   });
  // }
}
