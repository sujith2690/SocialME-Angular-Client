import { Component } from '@angular/core';
import { faCoffee, faBookBookmark, faBell, faComment, faHome, faSignOut, faSearch } from '@fortawesome/free-solid-svg-icons'
import { userDetails } from 'src/app/Core/Models/userDetails';
import { Router } from '@angular/router';


@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent {
  home = faHome
  coffee = faCoffee
  bookMark = faBookBookmark
  bell = faBell
  comment = faComment
  logout = faSignOut
  search = faSearch
  user: userDetails = {
    Notifications: [],
    firstname: '',
    followers: [],
    following: [],
    lastname: '',
    saved: [],
    username: '',
    _id: '',
    country: '',
    coverPicture: '',
    livesIn: '',
    profilePicture: '',
    relationship: '',
    worksAt: '',
  };
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.loadFromLocalStorage()
  }
  loadFromLocalStorage() {
    const storedContent = localStorage.getItem('User');
    if (storedContent) {
      this.user = JSON.parse(storedContent);
    }
  }
  goToUserProfile(userId: string) {
    // Use the Angular Router to navigate to the user's profile page
    this.router.navigate(['/user/profile', userId]);
  }
  logOut() {
    localStorage.setItem('User', '');
    localStorage.setItem('Token', '');
  }
}
