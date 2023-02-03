import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './components/personal/personal.component';
import { NotificationsComponent } from './components/notifications/notifications.component';


const routes: Routes = [
  {path: '', redirectTo:'/global', pathMatch:'full'},
  {path: 'personal', component: PersonalComponent},
  {path: 'notifications', component: NotificationsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
