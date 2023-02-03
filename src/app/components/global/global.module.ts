import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { GlobalRoutingModule } from './global-routing.module';
import { CommentsComponent } from '../comments/comments.component';



@NgModule({
  declarations: [
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    GlobalRoutingModule
  ]
})
export class GlobalModule { }
