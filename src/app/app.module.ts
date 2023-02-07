import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { GlobalComponent } from './components/global/global.component';
import { PersonalComponent } from './components/personal/personal.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MatCardModule } from '@angular/material/card';
import { GlobalModule } from './components/global/global.module';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GlobalComponent,
    PersonalComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    GlobalModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
