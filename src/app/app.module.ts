import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


import { AppComponent } from './components/app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { PersonalComponent } from './components/personal/personal.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { GlobalComponent } from './components/global/global.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PersonalComponent,
    SignupComponent,
    LoginComponent,
    UsersComponent,
    UserDetailComponent,
    GlobalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
