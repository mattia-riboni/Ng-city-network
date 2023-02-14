import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { GlobalRoutingModule } from './global-routing.module';
import { GlobalComponent } from './global.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    GlobalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    GlobalRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
  ]
})
export class GlobalModule { }
