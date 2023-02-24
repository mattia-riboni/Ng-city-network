import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './components/personal/personal.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { NewpostComponent } from './components/newpost/newpost.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { GlobalComponent } from './components/global/global.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: 'global', component: GlobalComponent, canActivate: [AuthGuard] },
  {path: 'personal', component: PersonalComponent, canActivate: [AuthGuard] },
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'newpost', component: NewpostComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
