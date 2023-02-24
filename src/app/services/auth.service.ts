import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../components/models/login';
import { SignUp } from '../components/models/sign-up';
import { User } from '../components/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  user!: User | null;

  constructor(private http: HttpClient) { }

  isAuthenticated(){
    return this.isLoggedIn
  };

  signUp(body: SignUp){
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeoc9oK8lKlqTT57Gakx9dgNGSn3E4XT0', body)
  };

  login(body: Login){
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeoc9oK8lKlqTT57Gakx9dgNGSn3E4XT0', body);
  };

  createUser(email: string, id: string, token: string, expirationDate: Date){
    this.user = new User(email, id, token, expirationDate)
    return this.isLoggedIn = true
  };

  logout(){
    this.isLoggedIn = false;
    this.user = null;
    localStorage.removeItem('user')
  }
}
