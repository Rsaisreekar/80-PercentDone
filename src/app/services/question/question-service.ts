// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class QuestionService {

//   constructor() { }
// }

// src/app/services/question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces for Question and Mapping
export interface Question {
  questionId: number;
  text: string;
  category: string;
  difficulty: string;
  correctAnswer: string;
  options: string[];
}

export interface Mapping {
  id: number;
  examId: number;
  questionId: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly baseUrl = 'http://localhost:8084/api/exam-management/mappings';
  private readonly baseUrl2 = 'http://localhost:8083/api/questionbank';

  constructor(private http: HttpClient) {}

  /** Question Bank Operations **/

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl2}/getAll`);
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl2}/questionById/${id}`);
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl2}/addQuestion`, question);
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl2}/updateQuestion/${id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl2}/delQuestion/${id}`);
  }

  /** Mapping Operations **/

  // Get all mapped questions (as Mapping objects) for a given exam
  getMappingsForExam(examId: number): Observable<Mapping[]> {
    return this.http.get<Mapping[]>(`${this.baseUrl}/exam/${examId}`);
  }

  // Map a question to a specific exam
  mapQuestionToExam(examId: number, questionId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/exams/${examId}/questions/${questionId}`, {});
  }

  // Delete a specific mapping by its ID
  deleteMapping(mappingId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${mappingId}`);
  }

  // Unmap all questions from a given exam
  unmapAllFromExam(examId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/exam/${examId}`);
  }

  getMappedQuestions(examId: number): Observable<Mapping[]> {
  return this.http.get<Mapping[]>(`${this.baseUrl}/exam/${examId}`);
}

mapQuestions(examId: number, questionIds: number[]): Observable<any> {
  return new Observable(observer => {
    let completed = 0;
    const total = questionIds.length;
    const errors: any[] = [];

    questionIds.forEach(qId => {
      this.mapQuestionToExam(examId, qId).subscribe({
        next: () => {
          completed++;
          if (completed === total) {
            if (errors.length) {
              observer.error({ message: 'Some mappings failed', details: errors });
            } else {
              observer.next(true);
              observer.complete();
            }
          }
        },
        error: err => {
          errors.push({ questionId: qId, error: err });
          completed++;
          if (completed === total) {
            observer.error({ message: 'Some mappings failed', details: errors });
          }
        }
      });
    });
  });
}


}
