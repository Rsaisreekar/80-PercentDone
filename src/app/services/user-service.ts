// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor() { }
// }


import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserProfile {
  userId: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8081/examProtal/userModule'; // adjust as needed

  constructor(private http: HttpClient) {}

  getUserProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/${userId}/profile`);
  }
 updateUser(userData: any): Observable<any> {
  const token = localStorage.getItem('token');
  //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put(`${this.baseUrl}/update/${userData.userId}`, userData);
}

}
