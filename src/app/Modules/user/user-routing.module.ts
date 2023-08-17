import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SavedPostsComponent } from './pages/saved-posts/saved-posts.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ErrorComponent } from './pages/error/error.component';
import { userGuard } from 'src/app/Core/Guard/user/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
    { path: '', component: HomeComponent,  canActivate: [userGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'saved', component: SavedPostsComponent,canActivate: [userGuard] },
    { path: 'profile/:id', component: ProfileComponent,canActivate: [userGuard] },
    { path: 'chat', component: ChatComponent,canActivate: [userGuard] },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: "/error" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
