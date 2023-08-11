import { Component } from '@angular/core';
import { faCoffee, faBookBookmark,faBell,faComment,faHome,faSignOut,faSearch } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent {
  home=faHome
  coffee = faCoffee
  bookMark = faBookBookmark
  bell =faBell
  comment= faComment
  logout=faSignOut
  search = faSearch
  logOut(){
    localStorage.setItem('User', '');
    localStorage.setItem('Token', '');
  }
}
