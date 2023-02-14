import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './components/personal/personal.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserComponent } from './components/user/user.component';
import { MypostsComponent } from './components/myposts/myposts.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  {path: '', redirectTo:'/global', pathMatch:'full'},
  {path: 'personal', component: PersonalComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'user', component: UserComponent},
  {path: 'myposts', component: MypostsComponent},
  {path: 'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
