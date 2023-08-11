import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostShareComponent } from './components/post-share/post-share.component';
import { PostComponent } from './components/post/post.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SavedPostsComponent } from './pages/saved-posts/saved-posts.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/AuthService/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    LeftSidebarComponent,
    NavbarComponent,
    PostShareComponent,
    PostComponent,
    ProfileCardComponent,
    RightSidebarComponent,
    UserListComponent,
    ChatComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    SavedPostsComponent,
    SignUpComponent,
    UserComponent,
    CommentComponent,
  ],
  imports: [
    FontAwesomeModule,
    CommonModule, UserRoutingModule,
    FormsModule, ReactiveFormsModule,
    // BrowserAnimationsModule, ToastrModule.forRoot()
  ],
  providers: [AuthService],
})
export class UserModule { }
