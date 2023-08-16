import { Component } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  coverImage = '../../../assets/images/coverImage.jpg'
  profileImage = '../../../assets/images/avatar.png'
  Edit = faPen
}
