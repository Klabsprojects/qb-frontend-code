import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { userLogin } from './auth.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class authService {
 user:any; 
 userRole: any;
 storageKey = 'userRole';
 authTokenSubject = new BehaviorSubject<string | null>(null);
 authToken$: Observable<string | null> = this.authTokenSubject.asObservable();
 authToken : string | null = null;
 //public baseUrl = 'http://127.0.0.1:3000';
 //public baseUrl = 'http://13.234.169.84:3000';

 public loginUrl = environment.baseUrl+'/api/login';
//  public loginUrl = 'https://api-qgen.a2zweb.in/test-api/login'
 constructor(private http:HttpClient){
  const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      this.setAuthToken(storedToken);
    }
 }
 
  login(data:userLogin):Observable<any>{
    // this.user = data;
    // localStorage.setItem('user', JSON.stringify(this.user));
    return this.http.post<any>(`${this.loginUrl}`, data).pipe(
      tap((response) => {
        console.log("response in auth user",response)
        const authToken = response?.authToken;
        const userRole = response.data.role;
        const subject = response.data.subjects;
        this.setAuthToken(authToken);
        this.setUserRole(userRole);
        this.setUserSubject(subject)
      })
    );  
  }

  setAuthToken(token: string): void {
    this.authTokenSubject.next(token);
    localStorage.setItem('authToken', token);
  }
  setUserSubject(subject:string): void {
    localStorage.setItem('subject',subject);
  }

  getAuthToken(): string | null {
    return this.authTokenSubject.value;
  }

  setUserRole(role: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(role));
  }

  getUserRole(): any | null {
    const storedUserRole = localStorage.getItem(this.storageKey);
    return storedUserRole ? JSON.parse(storedUserRole) : null;
  }

  getUserSubject():any | null{
    return localStorage.getItem('subject');
  }
  
  logout(): void {
    this.authTokenSubject.next(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('subject');
    /////
    localStorage.removeItem('qbtype');
    localStorage.removeItem('qbclass');
    localStorage.removeItem('qbsubject');
    localStorage.removeItem('qbchapter');
    localStorage.removeItem('qbtopic');
    localStorage.removeItem('qbstatus');
  }

  getUser():any{
    return this.user;
  }
// setUserRole(id: number): void {
  //   this.userRole = id;
  // }
  // getUserRole(): number {
  //   return this.userRole;
  // }
}