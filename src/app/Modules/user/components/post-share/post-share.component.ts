import { Component } from '@angular/core';
import { faImage, faVideo, faLocation } from '@fortawesome/free-solid-svg-icons'
import { environment } from 'src/environment/environment';

type userDetails = {
  Notifications: [],
  country: string,
  coverPicture: string,
  createdAt: string,
  firstname: string,
  followers: [],
  following: [],
  isBlock: boolean,
  isUser: boolean,
  lastname: string,
  livesIn: string,
  profilePicture: string,
  relationship: string,
  saved: [],
  updatedAt: string,
  username: string,
  verified: boolean,
  worksAt: string,
}
@Component({
  selector: 'app-post-share',
  templateUrl: './post-share.component.html',
  styleUrls: ['./post-share.component.css']
})
export class PostShareComponent {
  profileImage = '../../../assets/images/avatar.png'
  image = faImage
  video = faVideo
  location = faLocation
  userDetails: any
  user: any
  serverPublic = environment.serverPublic;


  ngOnInit() {
    this.loadFromLocalStorage()
  }

  loadFromLocalStorage() {
    const storedContent = localStorage.getItem('User');
    if (storedContent) {
      this.user = JSON.parse(storedContent);
    } else {
      this.user=[]
    }
  }

}
