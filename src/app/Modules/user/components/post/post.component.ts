import { Component, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PostService } from 'src/app/Core/Services/PostRequest/post.service';
import { UserService } from 'src/app/Core/Services/local/user.service';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  profileImage = '../../../assets/images/avatar.png'
  postImage = '../../../assets/images/coverImage.jpg'
  liked = '../../../assets/images/liked.png'
  unLike = '../../../assets/images/notlike.png'
  comment = '../../../assets/images/comment.png'
  constructor(
    private PostService: PostService,
    private Local: UserService,
    private PostRequest: PostService
  ) { }

  @Input() newPost: boolean = false

  user: any
  userId: string = ''
  posts: any
  serverPublic = environment.serverPublic;
  show: string | null = null;
  ngOnInit() {
    this.getUser()
    this.getTimeLine()
  }

  // UN Subscribe.......
  private ngUnsubscribe = new Subject<void>();
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['newPost']) {
      console.log('its herer-------')
      this.getTimeLine();
    }
  }
  //.............
  getUser() {
    this.user = this.Local.loadFromLocalStorage()
    this.userId = this.user._id
  }
  getTimeLine() {
    if(this.userId){
      this.PostRequest.getTimelinePosts(this.userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
        this.posts = result.map((item: any) => {
          const likedNumber = item.likes.length;
          if (item.likes.includes(this.userId)) {
            const liked = true
            return { ...item, liked, likedNumber: likedNumber };
          } else {
            const liked = false
            return { ...item, liked, likedNumber: likedNumber }
          }
        });
        console.log(this.posts, '---posts')
      });
    }
  }
  handleLike(item: any) {
    this.PostRequest.likePost(item._id, this.userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      console.log(result, '-----------like');
      const itemIndex = this.posts.findIndex((post: any) => post._id === item._id);
      if (itemIndex !== -1) {
        if (result === 'Post UnLiked') {
          this.posts[itemIndex].likedNumber--;
          this.posts[itemIndex].liked = false
        } else {
          this.posts[itemIndex].likedNumber++;
          this.posts[itemIndex].liked = true
        }
      }
    });
  }
  handleShow(itemId: string) {
    if (this.show === itemId) {
      this.show = null
    } else {
      this.show = itemId
    }
  }
  handleCommentAdded() {
    this.getTimeLine()
  }
}