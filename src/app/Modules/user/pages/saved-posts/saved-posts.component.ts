import { Component } from '@angular/core';

@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent {
  newPost: boolean = false

  checkNewPost() {
    this.newPost = !this.newPost
    console.log('checking new post', this.newPost)
  }
}
