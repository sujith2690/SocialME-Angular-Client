import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }
  getUserData(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}user/${userId}`);
  }
}
