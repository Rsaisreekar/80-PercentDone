// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ExamAttemptService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  questionId: number;
  text: string;
  category: string;
  difficulty: string;
  option1: string;
  option2: string;
}

export interface AnswerSubmission {
  questionId: number;
  submittedAnswer: string;
}

export interface ExamSubmission {
  userId: number;
  answers: AnswerSubmission[];
}

@Injectable({ providedIn: 'root' })
export class ExamService {
  private baseUrl = 'http://localhost:8080/api/questionbank';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/attemptQuestions`);
  }

  submitExam(submission: ExamSubmission): Observable<any> {
    return this.http.post(`http://localhost:8080/api/exam/submit`, submission);
  }
}
