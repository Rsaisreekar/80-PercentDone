import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ExamDialogComponent } from '../../admin/exam-dialog';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-manage-exams',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    ExamDialogComponent,
    RouterModule
  ],
  templateUrl: './manage-exams.html',
  styleUrls: ['./manage-exams.css']
})

export class ManageExamsComponent {
  exams = [
    {
      examId: 1,
      title: 'Math Final Exam',
      description: 'Covers algebra, geometry, and calculus.',
      duration: 60,
      totalMarks: 100
    },
    {
      examId: 2,
      title: 'Science Quiz',
      description: 'Basic physics and chemistry concepts.',
      duration: 30,
      totalMarks: 50
    }
  ];

  constructor(private dialog: MatDialog) {}

  createExam() {
  const dialogRef = this.dialog.open(ExamDialogComponent, {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // For now, add exam to dummy array
      const newExam = { examId: Date.now(), ...result };
      this.exams.push(newExam);
    }
  });
}

  editExam(id: number) {
  const existingExam = this.exams.find(e => e.examId === id);
  const dialogRef = this.dialog.open(ExamDialogComponent, {
    width: '500px',
    data: existingExam
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const index = this.exams.findIndex(e => e.examId === id);
      this.exams[index] = { ...this.exams[index], ...result };
    }
  });
}
  deleteExam(examId: number) {
    this.exams = this.exams.filter(e => e.examId !== examId);
  }
}
