// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   imports: [],
//   templateUrl: './register.html',
//   styleUrl: './register.css'
// })
// export class Register {

// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private auth: AuthService, private router:Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   const { password, confirmPassword } = this.registerForm.value;

  //   if (this.registerForm.valid && password === confirmPassword) {
  //     this.auth.register(this.registerForm.value).subscribe({
  //       next: () => alert('Registration successful'),
  //       error: () => alert('Registration failed')
  //     });
  //   } else {
  //     alert('Password and Confirm Password must match');
  //   }
  // }

  onSubmit() {
  if (this.registerForm.invalid) return;

  this.auth.register(this.registerForm.value).subscribe({
    next: () => {
      alert('Registered Successfully!');
      this.router.navigate(['/login']);
    },
    error: err => {
      this.errorMessage = 'Registration failed: ' + err.error.message;
    }
  });
}

}
