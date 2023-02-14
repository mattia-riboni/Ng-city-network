import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalComponent } from './global.component';

const routes: Routes = [
  {path: 'global', component: GlobalComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalRoutingModule { }
