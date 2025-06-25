import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';

// @Component({
//   selector: 'app-exam-attempt',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule, MatCardModule, MatButtonModule, MatRadioModule, MatToolbarModule],
//   templateUrl: './exam-attempt.html',
//   styleUrl: './exam-attempt.css'
// })
// export class ExamAttemptComponent implements OnInit {
//   timer: number = 30 * 60; // 30 minutes in seconds
//   intervalId: any;
//   questions: any[] = [];
//   answers: { [key: number]: string } = {};

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     this.loadQuestions();
//     this.startTimer();
//   }

//   loadQuestions() {
//     this.questions = [
//       {
//         id: 1,
//         text: 'What is the capital of India?',
//         options: ['Mumbai', 'Delhi', 'Chennai', 'Kolkata']
//       },
//       {
//         id: 2,
//         text: 'Which is not a Java feature?',
//         options: ['Object-Oriented', 'Portable', 'Dynamic', 'Pointer-based']
//       },
//       {
//         id: 3,
//         text: 'Which layer in OSI deals with end-to-end delivery?',
//         options: ['Network', 'Transport', 'Data Link', 'Session']
//       }
//     ];
//   }

//   startTimer() {
//     this.intervalId = setInterval(() => {
//       if (this.timer > 0) {
//         this.timer--;
//       } else {
//         this.submitExam();
//       }
//     }, 1000);
//   }

//   formatTime(): string {
//     const minutes = Math.floor(this.timer / 60);
//     const seconds = this.timer % 60;
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   }

//   submitExam() {
//     clearInterval(this.intervalId);
//     alert('Exam submitted successfully!');
//     console.log('Answers:', this.answers);
//     this.router.navigate(['/student-home']);
//   }
// }

//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService, ExamSubmissionDTO, AnswerSubmissionDTO } from '../services/exam-service';

@Component({
  selector: 'app-exam-attempt',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule, MatButtonModule, MatRadioModule, MatToolbarModule],
  templateUrl: './exam-attempt.html',
  styleUrl: './exam-attempt.css'
})
export class ExamAttemptComponent implements OnInit {
  examId!: number;
  userId!: number;
  timer: number = 30 * 60;
  intervalId: any;
  questions: any[] = [];
  answers: { [key: number]: string } = {};
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('examId')!;
    this.userId = +localStorage.getItem('userId')!;
    this.loadQuestions();
    this.startTimer();
  }

  loadQuestions() {
    this.examService.getQuestionsByExamId(this.examId).subscribe({
      next: (data) => {
        this.questions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load questions', err);
        alert('Failed to load questions');
      }
    });
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.submitExam();
      }
    }, 1000);
  }

  formatTime(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  submitExam() {
    clearInterval(this.intervalId);

    const answersList: AnswerSubmissionDTO[] = Object.keys(this.answers).map((qid) => ({
      questionId: +qid,
      submittedAnswer: this.answers[+qid]
    }));

    const submission: ExamSubmissionDTO = {
      userId: this.userId,
      answers: answersList
    };

    this.examService.submitExam(this.examId, submission).subscribe({
      next: (res) => {
        alert('Exam submitted successfully!');
        this.router.navigate(['/results'], { state: { examId: this.examId, userId: this.userId } });
      },
      error: (err) => {
        console.error('Error submitting exam', err);
        alert('Failed to submit exam');
      }
    });
  }
}
