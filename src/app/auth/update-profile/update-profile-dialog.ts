// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { AuthService } from '../../services/auth';
// import { UserService } from '../../services/user-service';

// @Component({
//   selector: 'app-update-profile-dialog',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule
//   ],
//   templateUrl: './update-profile-dialog.html',
//   styleUrls: ['./update-profile-dialog.css']
// })
// export class UpdateProfileDialogComponent {
//   profileForm: FormGroup;

//   constructor(
//     public dialogRef: MatDialogRef<UpdateProfileDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private userService:UserService
//   ) {
//     this.profileForm = this.fb.group({
//       name: [data.name, Validators.required],
//       email: [data.email, [Validators.required, Validators.email]],
//       password: [''],
//       confirmPassword: ['']
//     });
//   }

//   ngOnInit(): void {
//   const userId = localStorage.getItem('userId');
//   if (userId) {
//     this.authService.getProfile().subscribe(
//       (data) => {
//         this.userForm.patchValue(data);
//       },
//       (error) => {
//         console.error('Error loading user:', error);
//       }
//     );
//   }
// }


//   onSave() {
//     if (
//       this.profileForm.value.password &&
//       this.profileForm.value.password !== this.profileForm.value.confirmPassword
//     ) {
//       alert('Passwords do not match!');
//       return;
//     }

//     this.authService.updateProfile(this.profileForm.value).subscribe({
//       next: () => {
//         this.dialogRef.close(true);
//       },
//       error: err => {
//         alert('Failed to update profile: ' + err.error.message);
//       }
//     });
//   }

//   cancel() {
//     this.dialogRef.close();
//   }
// }

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service';
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
export class UpdateProfileDialogComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getProfile().subscribe({
        next: (user) => {
          this.profileForm.patchValue({
            name: user.name,
            email: user.email
          });
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        }
      });
    }
  }

  onSave() {
    if (
      this.profileForm.value.password &&
      this.profileForm.value.password !== this.profileForm.value.confirmPassword
    ) {
      alert('Passwords do not match!');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User ID not found');
      return;
    }

    const updatedData = {
      userId: +userId,
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      password: this.profileForm.value.password || undefined
    };

    this.userService.updateUser(updatedData).subscribe({
      next: () => {
        alert('Profile updated successfully!');
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
