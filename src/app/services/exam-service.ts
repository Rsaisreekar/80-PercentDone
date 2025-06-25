// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ExamService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Exam {
  examId: number;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
}

export interface AnswerSubmissionDTO {
  questionId: number;
  submittedAnswer: string;
}

export interface ExamSubmissionDTO {
  userId: number;
  answers: AnswerSubmissionDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private baseUrl = 'http://localhost:8080/api/exams'; // update port if needed

  constructor(private http: HttpClient) {}

  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.baseUrl}/getAll`);
  }

  getQuestionsByExamId(examId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mapped-questions/${examId}`);
  }

  submitExam(examId: number, submission: ExamSubmissionDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit/${examId}`, submission);
  }
}
