import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SavedPostsComponent } from './pages/saved-posts/saved-posts.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'saved', component: SavedPostsComponent },
    { path: 'profile', component: ProfileCardComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: "/error" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
