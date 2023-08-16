
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { faImage, faVideo, faLocation, faClose } from '@fortawesome/free-solid-svg-icons'
import { environment } from 'src/environment/environment';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/Core/Services/PostRequest/post.service';
import { post, postDetails } from 'src/app/Core/Models/postDetails';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-post-share',
  templateUrl: './post-share.component.html',
  styleUrls: ['./post-share.component.css']
})
export class PostShareComponent implements OnInit {

  @ViewChild('desc') desc!: ElementRef;
  @ViewChild('imageInput') imageInput!: ElementRef;
  @Output() allPost = new EventEmitter<void>()

  profileImage = '../../../assets/images/avatar.png'
  image = faImage
  video = faVideo
  location = faLocation
  close = faClose

  user: any; // Replace 'any' with your user type
  serverPublic: string = environment.serverPublic; // Set the server public URL
  imageFile: File | null = null;
  imageUrl: string | null = null;


  constructor(private toast: ToastrService,
    private PostService: PostService) { }

  ngOnInit(): void {
    this.loadFromLocalStorage()
  }
  loadFromLocalStorage() {
    const storedContent = localStorage.getItem('User');
    if (storedContent) {
      this.user = JSON.parse(storedContent);
      console.log(this.user,'---usereeeeeeeee')
    } else {
      this.user = []
    }
  }
  private ngUnsubscribe = new Subject<void>();
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  onImageChange(event: any): void {
    const allowedTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
    const maxSizeInBytes = 1024 * 1024 * 2; // 1 MB

    const file: File = event.target.files[0];
    if (allowedTypes.includes(file.type) && file.size <= maxSizeInBytes) {
      this.imageFile = file;
      this.imageUrl = URL.createObjectURL(this.imageFile);
    } else {
      if (file.size >= maxSizeInBytes) {
        this.toast.warning('Big files')
        this.reset();
      } else {
        this.toast.success('Upload Success')
        this.reset();
      }
    }
  }

  reset(): void {
    this.imageFile = null;
    this.desc.nativeElement.value = '';
  }
  async handleSubmit(): Promise<void> {
    if (this.desc.nativeElement.value || this.imageFile) {

      const newPost: post = {
        userId: this.user._id,
        desc: this.desc.nativeElement.value,
      };
      console.log(newPost, '-------newPost')

      if (this.imageFile) {
        const filename = Date.now() + this.imageFile.name;
        this.imageUrl = URL.createObjectURL(this.imageFile);
        console.log(this.imageUrl, '-----------image')
        const data = new FormData();
        data.append('name', filename);
        data.append('file', this.imageFile);
        newPost.image = filename;
        console.log(data, '----------data')
        try {
          this.PostService.uploadImage(data).subscribe(() => {
            console.log(data, '--------image data')
          });
        } catch (error) {
          console.log(error, 'error in postShare');
        }
      }

      this.PostService.uploadPost(newPost).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
        this.allPost.emit()
      });
      this.reset();
    }
  }
  clearImage(): void {
    this.imageFile = null;
  }
}

