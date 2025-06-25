// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ResultService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReportSummary {
  reportId: number;
  userId: number;
  examId: number;
  totalMarks: number;
  performanceMetrics: string;
}

@Injectable({ providedIn: 'root' })
export class ResultService {
  private baseUrl = 'http://localhost:8080/analytics/reports';

  constructor(private http: HttpClient) {}

  getUserReport(userId: number, examId: number): Observable<ReportSummary> {
    return this.http.get<ReportSummary>(`${this.baseUrl}/user/${userId}/exam/${examId}`);
  }

  getRank(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/rank?userId=${userId}`);
  }

  getTopper(): Observable<ReportSummary> {
    return this.http.get<ReportSummary>(`${this.baseUrl}/topper`);
  }
}
