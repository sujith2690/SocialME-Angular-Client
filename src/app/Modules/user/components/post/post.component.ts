import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from 'src/app/Core/Services/PostRequest/post.service';
import { UserService } from 'src/app/Core/Services/local/user.service';


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
  value: number = 0
  constructor(
    private PostService: PostService, 
    private Local: UserService,
    private PostRequest:PostService
    ) { }

  userDetails: any
  id:string=''
  posts:any
  ngOnInit() {
    this.getUser()
    this.getTimeLine()
  }
  getUser(){
    this.userDetails = this.Local.loadFromLocalStorage()
    console.log(this.userDetails._id,'---------------iidii5555d');
    this.id=this.userDetails._id
  }
  getTimeLine() {
    console.log('555555555555')
    this.PostRequest.getTimelinePosts(this.id).subscribe((result) => {
      console.log(result, '-----------post Details')
    })
  }
}
