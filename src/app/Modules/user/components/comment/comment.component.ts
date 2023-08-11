import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/Core/Services/PostRequest/post.service';
import { UserService } from 'src/app/Core/Services/local/user.service';
import { environment } from 'src/environment/environment';

// Define the Comment interface here
interface Comment {
  comments: {
    comment: string;
  };
  userData: {
    firstname: string;
    lastname: string;
    profilePicture: string;
  };
}
interface commentData {
  postId: string,
  userId: string,
  desc: string,
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() postId: string = ''
  @Output() commentAdded = new EventEmitter<void>();
  allComments: Comment[] = []
  commentForm!: FormGroup;
  constructor(
    private Comment: PostService,
    private Local: UserService,
    private formBuilder: FormBuilder
  ) { }
  user: any
  userId: string = ''
  // data:commentData
  serverPublic = environment.serverPublic;
  ngOnInit() {
    this.getUser();
    this.getComments();
    this.commentForm = this.formBuilder.group({
      inputComment: ['']
    });
  }
  getUser() {
    this.user = this.Local.loadFromLocalStorage()
    this.userId = this.user._id
  }
  getComments() {
    this.Comment.fetchComments(this.postId).subscribe((result) => {
      this.allComments = result
      console.log(this.allComments, '---------comment-----------')
    })
  }
  onSubmit = async () => {
    if (this.commentForm.value.inputComment) {
      const commentText = this.commentForm.value.inputComment;
      const data: commentData = {
        postId: this.postId,
        userId: this.userId,
        desc: commentText
      };
      try {
        this.Comment.uploadComment(data).subscribe();
        this.getComments();
        this.Comment.fetchComments(this.postId).subscribe((result) => {
          this.allComments = result
        })
         this.commentAdded.emit();
        this.commentForm.reset();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  }
}
