import { Component } from '@angular/core';
import { faImage, faVideo, faLocation } from '@fortawesome/free-solid-svg-icons'

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
}
