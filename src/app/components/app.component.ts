import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-project-1';

  constructor(private authService: AuthService){ }

  city!: string;
  token!: string;

  ngOnInit(){
    if (localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.token = user._token
      this.authService.createUser(user.email, user.id, user._token, user._expirationDate);
    }
  }


  selectCity(city: string){
    this.city = city
  }
}

