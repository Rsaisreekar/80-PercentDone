import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
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
    localStorage.setItem('examId', examId.toString());
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
