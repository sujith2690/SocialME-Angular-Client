import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { searchUser } from 'src/app/Core/Models/searchuser';
import { userDetails } from 'src/app/Core/Models/userDetails';
import { UserDataService } from 'src/app/Core/Services/User/user-data.service';
import { UserService } from 'src/app/Core/Services/local/user.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  coverImage = '../../../assets/images/coverImage.jpg'
  profileImage = '../../../assets/images/avatar.png'
  Edit = faPen
  customUser: string = ''
  loggedUser: string = ''
  user: searchUser = {
    allPosts: [],
    firstname: '',
    followers: [],
    following: [],
    lastname: '',
    username: '',
    _id: '',
    country: '',
    coverPicture: '',
    livesIn: '',
    profilePicture: '',
    relationship: '',
    worksAt: '',
  };
  serverPublic = environment.serverPublic;
  // userId: string = this.user._id
  constructor(
    private Local: UserService,
    private router: ActivatedRoute,
    private userData: UserDataService,
  ) { }
  ngOnInit() {
    let getParamId = this.router.snapshot.paramMap.get('id') || ''; // Provide a default value here
    this.customUser = getParamId
    this.getUser(getParamId);
  }

  getUser(userId?: string) {
    if (userId) {
      this.userData.getUserData(userId).subscribe((result) => {
        this.user = result

      })
    }
    this.user = this.Local.loadFromLocalStorage()
    this.loggedUser = this.user._id
  }
  handleFollow(userId:string){
    console.log(userId)
  }
}
  

