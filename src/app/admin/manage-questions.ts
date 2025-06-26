import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { QuestionService } from '../services/question/question-service';
import { Question } from '../models/question.model';
import { AddEditQuestionDialogComponent } from './add-edit-question-dialog';
import { ImportQuestionDialogComponent } from './import-question-dialog';

@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [MatToolbar,MatCard,MatCardContent,MatCardTitle,MatCardActions],
  templateUrl: './manage-questions.html',
  styleUrls: ['./manage-questions.css']
})
export class ManageQuestionsComponent implements OnInit {
  examId!: number;
  questionBank: Question[] = [];
  mappedQuestionIds: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    if (!this.examId) {
      alert('Invalid exam ID');
      return;
    }

    this.loadAllQuestions();
    this.loadMappedQuestions();
  }

  get questions(): Question[] {
    return this.questionBank.filter(q => this.mappedQuestionIds.includes(q.questionId));
  }

  loadAllQuestions() {
    this.questionService.getAllQuestions().subscribe({
      next: data => this.questionBank = data,
      error: err => alert('Failed to load questions: ' + err.error.message)
    });
  }

  loadMappedQuestions() {
    this.questionService.getMappedQuestions(this.examId).subscribe({
      next: data => this.mappedQuestionIds = data.map(q => q.questionId),
      error: err => alert('Failed to load mapped questions: ' + err.error.message)
    });
  }

  importQuestions() {
    const dialogRef = this.dialog.open(ImportQuestionDialogComponent, {
      width: '500px',
      data: { examId: this.examId, questionBank: this.questionBank }
    });

    dialogRef.afterClosed().subscribe((selectedIds: number[]) => {
      if (selectedIds?.length) {
        this.questionService.mapQuestions(this.examId, selectedIds).subscribe({
          next: () => this.loadMappedQuestions(),
          error: err => alert('Mapping failed: ' + err.error.message)
        });
      }
    });
  }

  addQuestion() {
    const dialogRef = this.dialog.open(AddEditQuestionDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((newQuestion: Question) => {
      if (newQuestion) {
        this.questionService.addQuestion(newQuestion).subscribe({
          next: () => {
            this.loadAllQuestions();
            setTimeout(() => this.mapSingleQuestion(newQuestion.questionId), 500);
          },
          error: err => alert('Failed to add question: ' + err.error.message)
        });
      }
    });
  }

  editQuestion(id: number) {
    const question = this.questionBank.find(q => q.questionId === id);
    const dialogRef = this.dialog.open(AddEditQuestionDialogComponent, {
      width: '600px',
      data: { question }
    });

    dialogRef.afterClosed().subscribe((updated: Question) => {
      if (updated) {
        this.questionService.updateQuestion(updated.questionId!, updated).subscribe({
          next: () => this.loadAllQuestions(),
          error: err => alert('Failed to update question: ' + err.error.message)
        });
      }
    });
  }

  deleteQuestion(id: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(id).subscribe({
        next: () => {
          this.loadAllQuestions();
          this.mappedQuestionIds = this.mappedQuestionIds.filter(qid => qid !== id);
        },
        error: err => alert('Failed to delete question: ' + err.error.message)
      });
    }
  }

  private mapSingleQuestion(questionId: number) {
    this.questionService.mapQuestionToExam(this.examId, questionId).subscribe({
      next: () => this.loadMappedQuestions(),
      error: err => console.error('Failed to map question:', err)
    });
  }
}
