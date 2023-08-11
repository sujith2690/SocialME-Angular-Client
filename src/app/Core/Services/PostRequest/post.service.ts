import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

interface commentData {
  postId: string,
  userId: string,
  desc: string,
}
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getTimelinePosts(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}post/${id}/timeline`);
  }
  likePost(postId: string, userId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}post/${postId}/like`, { userId })
  }
  fetchComments(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}post/${postId}/comments`)
  }
  uploadComment(data: commentData): Observable<any> {
    return this.http.post(`${this.baseUrl}post/comment`,{data})
  }
}
