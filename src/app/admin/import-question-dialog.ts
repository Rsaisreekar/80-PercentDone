// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatListModule } from '@angular/material/list';
// import { MatButtonModule } from '@angular/material/button';
// import { Question } from '../models/question.model';


// @Component({
//   selector: 'app-import-question-dialog',
//   standalone: true,
//   imports: [CommonModule, MatCheckboxModule, MatListModule, MatButtonModule],
//   templateUrl: './import-question-dialog.html',
//   styleUrls: ['./import-question-dialog.css']
// })
// export class ImportQuestionDialogComponent {
//   selectedQuestions: number[] = [];
//   questionBank: Question[] = [];
//   mappedIds: number[] = [];

//   constructor(
//     private dialogRef: MatDialogRef<ImportQuestionDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.questionBank = data.questionBank;
//     this.mappedIds = data.mappedQuestionIds;
//   }

//   toggleSelection(id: number) {
//     const index = this.selectedQuestions.indexOf(id);
//     if (index > -1) {
//       this.selectedQuestions.splice(index, 1);
//     } else {
//       this.selectedQuestions.push(id);
//     }
//   }

//   isMapped(id: number): boolean {
//     return this.mappedIds.includes(id);
//   }

//   importSelected() {
//     this.dialogRef.close(this.selectedQuestions);
//   }

//   cancel() {
//     this.dialogRef.close();
//   }
// }


import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Question } from '../services/question/question-service';

@Component({
  selector: 'app-import-question-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './import-question-dialog.html',
  styleUrls: ['./import-question-dialog.css']
})
export class ImportQuestionDialogComponent {
  selectedQuestions: number[] = [];
  questionBank: Question[] = [];
  mappedIds: number[] = [];

  filteredQuestions: Question[] = [];
  categories: string[] = [];
  difficulties: string[] = ['Easy', 'Medium', 'Hard'];
  selectedCategory = '';
  selectedDifficulty = '';

  constructor(
    private dialogRef: MatDialogRef<ImportQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.questionBank = data.questionBank;
    this.mappedIds = data.mappedQuestionIds;

    this.categories = [...new Set(this.questionBank.map(q => q.category))];
    this.filteredQuestions = [...this.questionBank];
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

  filterQuestions() {
    this.filteredQuestions = this.questionBank.filter(q => {
      return (
        (!this.selectedCategory || q.category === this.selectedCategory) &&
        (!this.selectedDifficulty || q.difficulty === this.selectedDifficulty)
      );
    });
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedDifficulty = '';
    this.filteredQuestions = [...this.questionBank];
  }

  importSelected() {
    this.dialogRef.close(this.selectedQuestions);
  }

  cancel() {
    this.dialogRef.close();
  }
}
