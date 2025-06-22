import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-profile-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './update-profile-dialog.html',
  styleUrls: ['./update-profile-dialog.css']
})
export class UpdateProfileDialogComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user.name = data.name;
    this.user.email = data.email;
  }

  saveChanges() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Updated user:', this.user);
    this.dialogRef.close(this.user); // return updated data
  }

  cancel() {
    this.dialogRef.close();
  }
}
