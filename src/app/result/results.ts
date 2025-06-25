import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ResultService } from '../services/result-service';

// @Component({
//   selector: 'app-results',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     MatCardModule,
//     MatToolbarModule,
//     MatButtonModule,
//     MatMenuModule,
//     MatIconModule,
//     MatTableModule
//   ],
//   templateUrl: './results.html',
//   styleUrls: ['./results.css']
// })
// export class ResultsComponent implements OnInit {

//   resultData = {
//     userName: 'Sai Sreekar',
//     examName: 'Java Basics',
//     score: 26,
//     totalMarks: 30,
//     status: 'Pass'
//   };

//   questions = [
//     {
//       id: 1,
//       text: 'What is the capital of India?',
//       userAnswer: 'Mumbai',
//       correctAnswer: 'Delhi'
//     },
//     {
//       id: 2,
//       text: 'Which is not a Java feature?',
//       userAnswer: 'Pointer-based',
//       correctAnswer: 'Pointer-based'
//     },
//     {
//       id: 3,
//       text: 'Which layer in OSI deals with end-to-end delivery?',
//       userAnswer: 'Network',
//       correctAnswer: 'Transport'
//     }
//   ];

//   displayedColumns: string[] = ['text', 'userAnswer', 'correctAnswer', 'status'];

//   constructor(private router: Router) {}

//   ngOnInit(): void {}

//   getStatus(question: any): string {
//     return question.userAnswer === question.correctAnswer ? 'Correct' : 'Wrong';
//   }

//   goHome() {
//     this.router.navigate(['/student-home']);
//   }
// }

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatTableModule],
  templateUrl: './results.html',
  styleUrls: ['./results.css']
})
export class ResultsComponent implements OnInit {
  resultData: any;
  displayedColumns: string[] = ['text', 'userAnswer', 'correctAnswer', 'status'];
  questions: any[] = [];

  constructor(
    private resultService: ResultService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const userId = navigation?.extras?.state?.['userId'];

    if (userId) {
      const examId = 1; // In real case, examId should be passed via state or route param
      this.resultService.getUserReport(userId, examId).subscribe({
        next: (res) => {
          this.resultData = {
            userName: `User-${userId}`,
            examName: `Exam-${examId}`,
            score: res.totalMarks,
            totalMarks: 100,
            status: res.performanceMetrics
          };
        },
        error: () => alert('Failed to load report')
      });
    } else {
      alert('No user ID found');
      this.router.navigate(['/student-home']);
    }
  }

  getStatus(q: any): string {
    return q.userAnswer === q.correctAnswer ? 'Correct' : 'Wrong';
  }

  goHome() {
    this.router.navigate(['/student-home']);
  }
}
