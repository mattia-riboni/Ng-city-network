import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { GlobalModule } from './components/global/global.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { PersonalComponent } from './components/personal/personal.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserComponent } from './components/user/user.component';
import { MypostsComponent } from './components/myposts/myposts.component';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PersonalComponent,
    NotificationsComponent,
    UserComponent,
    MypostsComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    GlobalModule,
    FormsModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
