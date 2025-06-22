import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-import-question-dialog',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatListModule, MatButtonModule],
  templateUrl: './import-question-dialog.html',
  styleUrls: ['./import-question-dialog.css']
})
export class ImportQuestionDialogComponent {
  selectedQuestions: number[] = [];
  questionBank = [
    { questionId: 1, text: 'What is 2 + 2?' },
    { questionId: 2, text: 'Capital of Japan?' },
    { questionId: 3, text: 'What is H2O?' },
    { questionId: 4, text: 'Who wrote Hamlet?' }
  ];

  constructor(
    private dialogRef: MatDialogRef<ImportQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public examId: number
  ) {}

  toggleSelection(id: number) {
    const index = this.selectedQuestions.indexOf(id);
    if (index > -1) {
      this.selectedQuestions.splice(index, 1);
    } else {
      this.selectedQuestions.push(id);
    }
  }

  importSelected() {
    this.dialogRef.close(this.selectedQuestions);
  }

  cancel() {
    this.dialogRef.close();
  }
}
