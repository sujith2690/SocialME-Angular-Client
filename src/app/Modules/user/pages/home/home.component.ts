import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  newPost: boolean = false

  checkNewPost() {
    this.newPost = !this.newPost
    console.log('checking new post',this.newPost)
  }
}
