import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getTimelinePosts(id: string): Observable<any> {
    console.log(id,'--id-----------')
    return this.http.get(`${this.baseUrl}post/${id}/timeline`);
  }
}
