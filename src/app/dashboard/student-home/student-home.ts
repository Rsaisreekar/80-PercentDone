 //to database code 

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { RouterModule, Router } from '@angular/router';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-student-home',
//   standalone: true,
//   imports: [CommonModule, HttpClient, RouterModule, MatCardModule, MatButtonModule],
//   templateUrl: './student-home.component.html',
//   styleUrl: './student-home.component.css'
// })
// export class StudentHomeComponent implements OnInit {
//   exams: any[] = [];

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit(): void {
//     this.http.get<any[]>('/api/admin/exams/getAllExams').subscribe({
//       next: (data) => this.exams = data,
//       error: (err) => alert('Failed to load exams')
//     });
//   }

//   startExam(examId: number) {
//     this.router.navigate(['/exam', examId]);
//   }

//   viewResults() {
//     this.router.navigate(['/results']);
//   }

//   updateProfile() {
//     this.router.navigate(['/update-profile']);
//   }
// }


//to hardcoded data

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Router } from '@angular/router';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule, MatDialog } from '@angular/material/dialog';
// import { UpdateProfileDialogComponent } from '../../auth/update-profile/update-profile-dialog';

// @Component({
//   selector: 'app-student-home',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     MatToolbarModule,
//     MatMenuModule,
//     MatIconModule,
//     MatCardModule,
//     MatButtonModule,
//     MatDialogModule,
//     UpdateProfileDialogComponent
//   ],
//   templateUrl: './student-home.html',
//   styleUrl: './student-home.css'
// })
// export class StudentHomeComponent implements OnInit {
//   // Dummy exam data
//   exams = [
//     {
//       examId: 1,
//       title: 'Java Basics',
//       description: 'Test your knowledge on core Java concepts.',
//       duration: 60,
//       totalMarks: 100
//     },
//     {
//       examId: 2,
//       title: 'Networking Fundamentals',
//       description: 'Covers OSI model, TCP/IP, and protocols.',
//       duration: 45,
//       totalMarks: 80
//     },
//     {
//       examId: 3,
//       title: 'Spring Boot',
//       description: 'Covers Spring Core, Data JPA, and Security.',
//       duration: 50,
//       totalMarks: 90
//     }
//   ];

//   constructor(private router: Router,private dialog: MatDialog) {}
  

//   ngOnInit(): void {
//     // Future: Load exams from backend using a service
//   }

//   // Navigate to exam attempt page
//   startExam(examId: number): void {
//     alert(`Navigating to exam ID: ${examId}`);
//     this.router.navigate(['/exam', examId]);
//   }

//   // Navigate to results page
//   viewResults(): void {
//     this.router.navigate(['/results']);
//   }

//   // Navigate to update profile
//   updateProfile(): void {
//     this.router.navigate(['/update-profile']);
//   }

//   // Logout logic (optional placeholder)
//   logout(): void {
//     alert('Logging out...');
//     this.router.navigate(['/login']);
//   }

//   openUpdateProfileDialog() {
//     const dialogRef = this.dialog.open(UpdateProfileDialogComponent, {
//       width: '400px',
//       data: {
//         name: 'Sai Sreekar',
//         email: 'sai@example.com'
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         console.log('Updated user:', result);
//       }
//     });
// }
// }


//-----real working

// student-home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth';
import { UserService, UserProfile } from '../../services/user-service';
import { UpdateProfileDialogComponent } from '../../auth/update-profile/update-profile-dialog';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.html',
  styleUrls: ['./student-home.css'],
  imports:[CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    ]
})
export class StudentHomeComponent implements OnInit {
  user: UserProfile | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
  const userId = localStorage.getItem('userId');
  if (userId) {
    this.authService.getProfile().subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
        console.error('Failed to fetch user details:', error);
      }
    );
  }
}


  startExam(examId: number): void {
    this.router.navigate(['/exam', examId]);
  }

  viewResults(): void {
    this.router.navigate(['/results']);
  }

  updateProfile(): void {
    this.router.navigate(['/update-profile']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  openUpdateProfileDialog() {
    const dialogRef = this.dialog.open(UpdateProfileDialogComponent, {
      width: '400px',
      data: {
        name: this.user?.name || '',
        email: this.user?.email || ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updated user:', result);
        this.ngOnInit(); // Refresh profile
      }
    });
  }
}
