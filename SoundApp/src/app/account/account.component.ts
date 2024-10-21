import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-account-window',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class AccountComponent {

  constructor(private dialog: MatDialog) {}

  openAccountDialog() {
    const dialogRef = this.dialog.open(AccountComponent, {
      width: '400px',
    });
  }
}
