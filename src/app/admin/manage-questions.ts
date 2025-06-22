import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImportQuestionDialogComponent } from '../admin/import-question-dialog';
import { RouterModule } from '@angular/router';
import { Question } from '../models/question.model';
import { AddEditQuestionDialogComponent } from './add-edit-question-dialog';

@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbar,
    RouterModule
  ],
  templateUrl: './manage-questions.html',
  styleUrls: ['./manage-questions.css']
})
export class ManageQuestionsComponent {
  // This is your complete bank of available questions
  questionBank: Question[] = [
    {
      questionId: 1,
      text: 'What is 2 + 2?',
      category: 'Math',
      difficulty: 'Easy',
      correctAnswer: '4',
      options: ['2', '3', '4', '5']
    },
    {
      questionId: 2,
      text: 'Capital of Japan?',
      category: 'Geography',
      difficulty: 'Medium',
      correctAnswer: 'Tokyo',
      options: ['Seoul', 'Tokyo', 'Beijing', 'Bangkok']
    },
    {
      questionId: 3,
      text: 'What is H2O?',
      category: 'Science',
      difficulty: 'Easy',
      correctAnswer: 'Water',
      options: ['Oxygen', 'Hydrogen', 'Salt', 'Water']
    },
    {
      questionId: 4,
      text: 'Who wrote Hamlet?',
      category: 'Literature',
      difficulty: 'Hard',
      correctAnswer: 'Shakespeare',
      options: ['Milton', 'Shakespeare', 'Keats', 'Wordsworth']
    }
  ];

  // This holds the selected questions per exam
  examQuestionMap: { [examId: number]: number[] } = {};

  selectedExamId = 101; // You can make this dynamic later

  constructor(private dialog: MatDialog) {}

  // This dynamically filters the question list to only those selected for this exam
  get questions(): Question[] {
    const mappedIds = this.examQuestionMap[this.selectedExamId] || [];
    return this.questionBank.filter(q => mappedIds.includes(q.questionId));
  }

  // Import selected questions from the dialog
  importQuestions() {
    const dialogRef = this.dialog.open(ImportQuestionDialogComponent, {
      width: '500px',
      data: this.selectedExamId
    });

    dialogRef.afterClosed().subscribe((selectedIds: number[]) => {
      if (selectedIds && selectedIds.length > 0) {
        this.examQuestionMap[this.selectedExamId] = selectedIds;
      }
    });
  }

  addQuestion() {
  const dialogRef = this.dialog.open(AddEditQuestionDialogComponent, {
    width: '600px',
    data: {} // empty data for new question
  });

  dialogRef.afterClosed().subscribe((newQuestion: Question) => {
    if (newQuestion) {
      // Generate a new questionId
      newQuestion.questionId = Math.max(...this.questionBank.map(q => q.questionId)) + 1;

      this.questionBank.push(newQuestion);

      // Add to current exam mapping
      if (!this.examQuestionMap[this.selectedExamId]) {
        this.examQuestionMap[this.selectedExamId] = [];
      }
      this.examQuestionMap[this.selectedExamId].push(newQuestion.questionId);
    }
  });
}
  editQuestion(id: number) {
  const questionToEdit = this.questionBank.find(q => q.questionId === id);
  const dialogRef = this.dialog.open(AddEditQuestionDialogComponent, {
    width: '600px',
    data: { question: questionToEdit }
  });

  dialogRef.afterClosed().subscribe((updated: Question) => {
    if (updated) {
      const index = this.questionBank.findIndex(q => q.questionId === updated.questionId);
      if (index !== -1) {
        this.questionBank[index] = updated;
      }
    }
  });
}

  deleteQuestion(id: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      const updatedIds = (this.examQuestionMap[this.selectedExamId] || []).filter(qId => qId !== id);
      this.examQuestionMap[this.selectedExamId] = updatedIds;
    }
  }
}
