import { Component, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, forkJoin, map, takeUntil } from 'rxjs';
import { profileData } from 'src/app/Core/Models/profileDetails';
import { PostService } from 'src/app/Core/Services/PostRequest/post.service';
import { UserDataService } from 'src/app/Core/Services/User/user-data.service';
import { UserService } from 'src/app/Core/Services/local/user.service';
import { environment } from 'src/environment/environment';
import { faBookBookmark,faBookMedical } from '@fortawesome/free-solid-svg-icons'
import { savedPost } from 'src/app/Core/Models/postDetails';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  bookMark = faBookBookmark
  mark = faBookMedical
  profileImage = '../../../assets/images/avatar.png'
  postImage = '../../../assets/images/coverImage.jpg'
  liked = '../../../assets/images/liked.png'
  unLike = '../../../assets/images/notlike.png'
  comment = '../../../assets/images/comment.png'
  constructor(
    private PostService: PostService,
    private Local: UserService,
    private PostRequest: PostService,
    private router: ActivatedRoute,
    private userData: UserDataService,
    private toast: ToastrService,
  ) { }

  @Input() newPost: boolean = false
  @Input() location?: string;

  user: any
  userId: string = ''
  posts: any

  serverPublic = environment.serverPublic;
  show: string | null = null;
  ngOnInit() {
    this.getUser()
    let getParamId = this.router.snapshot.paramMap.get('id') || ''; // Provide a default value here
    if (getParamId) this.userId = getParamId
    this.getTimeLine(getParamId)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['newPost']) {
      this.getTimeLine(this.userId);
    }
  }
  //.............
  getUser() {
    this.user = this.Local.loadFromLocalStorage()
    console.log(this.user,'---loged user')
    this.userId = this.user._id
  }
  getTimeLine(userId: string) {

    if (userId) {
      this.userData.getUserData(userId).subscribe((result) => {
        this.user = result
        console.log(this.user, '---------------user result')
        this.posts = result.allPosts.map((item: any) => {
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
      })
    } else {
      if (this.userId) {
        if (this.location) {

          this.PostRequest.getSavedPost(this.userId).pipe(
            takeUntil(this.ngUnsubscribe)
          ).subscribe((result) => {
            const postObservables = result.map((item: any) => {
              return this.userData.getUserData(item.userId).pipe(
                map(userData => {
                  const likedNumber = item.likes.length;
                  const liked = item.likes.includes(this.userId);
                  return {
                    ...item,
                    liked,
                    likedNumber,
                    firstname: userData.firstname,
                    lastname:userData.lastname,
                    profilePicture:userData.profilePicture,
                  };
                })
              );
            });
            forkJoin(postObservables).subscribe(transformedPosts => {
              this.posts = transformedPosts;
              console.log(this.posts, '-saved--posts');
            });
          });          
        } else {
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
            console.log(this.posts, '-----------posts')
          });
        }
      }
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
          this.toast.success("Liked");
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
    this.getTimeLine(this.userId)
  }
  handleSave(postId: string) {
    console.log('clicked saved');
    this.PostRequest.savePost(postId, this.userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      console.log(result, '-----------result');
      const postIndex = this.posts.findIndex((post: any) => post._id === postId);
      if (postIndex !== -1) {
        if (result === 'Post Saved') {
          this.posts[postIndex].savedusers.push(this.userId); // Add user to savedusers array
          this.toast.success(result);
        } else if (result === 'Post Unsaved') {
          this.posts[postIndex].savedusers = this.posts[postIndex].savedusers.filter((userId: string) => userId !== this.userId); // Remove user from savedusers array
          this.toast.success(result);
        } else {
          this.toast.warning(result);
        }
      }
    });
  }
  










  // UN Subscribe.......
  private ngUnsubscribe = new Subject<void>();
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}