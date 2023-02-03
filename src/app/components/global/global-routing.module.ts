import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalComponent } from './global.component';
import { CommentsComponent } from '../comments/comments.component';

const routes: Routes = [
  {path: 'global', component: GlobalComponent, children: [
    {path: 'comments', component: CommentsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalRoutingModule { }
