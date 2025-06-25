import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

// // ... existing imports
// @Component({
//   selector: 'app-exams',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     MatToolbarModule,
//     MatMenuModule,
//     MatIconModule,
//     MatCardModule,
//     MatButtonModule
//   ],
//   templateUrl: './exams.html',
//   styleUrl: './exams.css'
// })
// export class ExamsComponent implements OnInit {
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

//   constructor(private router: Router) {}

//   ngOnInit(): void {}

//   startExam(examId: number): void {
//     alert(`Navigating to exam ID: ${examId}`);
//     this.router.navigate(['/exam', examId]);
//   }

//   updateProfile(): void {
//     this.router.navigate(['/update-profile']);
//   }

//   logout(): void {
//     alert('Logging out...');
//     this.router.navigate(['/login']);
//   }
// }


//import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { ExamService, Exam } from '../services/exam-service';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './exams.html',
  styleUrl: './exams.css'
})
export class ExamsComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit(): void {
    this.examService.getAllExams().subscribe({
      next: (data) => this.exams = data,
      error: (err) => {
        console.error('Error fetching exams', err);
        alert('Unable to fetch exams from server.');
      }
    });
  }

  startExam(examId: number): void {
    this.router.navigate(['/exam', examId]);
  }

  updateProfile(): void {
    this.router.navigate(['/update-profile']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
