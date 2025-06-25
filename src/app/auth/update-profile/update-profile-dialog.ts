// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { AuthService } from '../../services/auth';

// @Component({
//   selector: 'app-update-profile-dialog',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule
//   ],
//   templateUrl: './update-profile-dialog.html',
//   styleUrls: ['./update-profile-dialog.css']
// })
// export class UpdateProfileDialogComponent {
//   user = {
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   };

//   constructor(
//     public dialogRef: MatDialogRef<UpdateProfileDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private authService:AuthService
//   ) {
//     this.user.name = data.name;
//     this.user.email = data.email;
//   }

//   saveChanges() {
//     if (this.user.password !== this.user.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     console.log('Updated user:', this.user);
//     this.dialogRef.close(this.user); // return updated data
//   }

//   onSave() {
//   this.authService.updateProfile(this.profileForm.value).subscribe({
//     next: () => {
//       this.dialogRef.close(true);
//     },
//     error: err => {
//       alert('Failed to update profile: ' + err.error.message);
//     }
//   });
// }


//   cancel() {
//     this.dialogRef.close();
//   }
// }

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-update-profile-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './update-profile-dialog.html',
  styleUrls: ['./update-profile-dialog.css']
})
export class UpdateProfileDialogComponent {
  profileForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: ['']
    });
  }

  onSave() {
    if (
      this.profileForm.value.password &&
      this.profileForm.value.password !== this.profileForm.value.confirmPassword
    ) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: err => {
        alert('Failed to update profile: ' + err.error.message);
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
