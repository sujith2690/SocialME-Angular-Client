import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl; // Use the base URL from environment.ts
  constructor(private http: HttpClient) { }

  logIn(formData: any): Observable<any> {
    console.log(formData,'--login form data')
    const url:string = `${this.baseUrl}login`;
    return this.http.post(url, formData);
  }
  
}
