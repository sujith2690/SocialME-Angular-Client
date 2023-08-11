import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { loginData, signupData } from '../../Models/authDetails';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = environment.baseUrl; // Use the base URL from environment.ts
  constructor(private http: HttpClient) { }

  logIn(formData: loginData): Observable<any> {
    console.log(formData,'---------forndata')
    const url:string = `${this.baseUrl}login`;
    return this.http.post(url, formData);
  }
  signUp(formData: signupData): Observable<any> {
    console.log(formData,'---------forndata')
    const url:string = `${this.baseUrl}register`;
    return this.http.post(url, formData);
  }
  
}
