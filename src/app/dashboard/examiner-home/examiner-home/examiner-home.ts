import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-examiner-home',
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './examiner-home.html',
  styleUrl: './examiner-home.css'
})
export class ExaminerHome {

}
