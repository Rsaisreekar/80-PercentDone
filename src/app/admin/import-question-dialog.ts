import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../models/question.model';


@Component({
  selector: 'app-import-question-dialog',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatListModule, MatButtonModule],
  templateUrl: './import-question-dialog.html',
  styleUrls: ['./import-question-dialog.css']
})
export class ImportQuestionDialogComponent {
  selectedQuestions: number[] = [];
  questionBank: Question[] = [];
  mappedIds: number[] = [];

  constructor(
    private dialogRef: MatDialogRef<ImportQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.questionBank = data.questionBank;
    this.mappedIds = data.mappedQuestionIds;
  }

  toggleSelection(id: number) {
    const index = this.selectedQuestions.indexOf(id);
    if (index > -1) {
      this.selectedQuestions.splice(index, 1);
    } else {
      this.selectedQuestions.push(id);
    }
  }

  isMapped(id: number): boolean {
    return this.mappedIds.includes(id);
  }

  importSelected() {
    this.dialogRef.close(this.selectedQuestions);
  }

  cancel() {
    this.dialogRef.close();
  }
}
