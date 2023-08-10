import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  profileImage = '../../../assets/images/avatar.png'
  postImage = '../../../assets/images/coverImage.jpg'
  liked = '../../../assets/images/liked.png'
  comment = '../../../assets/images/comment.png'


  counter: number = 0
  value: number=0

  ngOnInit() {
  }

}
