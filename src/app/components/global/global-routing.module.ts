import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { GlobalComponent } from './global.component';

const routes: Routes = [
  {path: 'global', component: GlobalComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalRoutingModule { }
