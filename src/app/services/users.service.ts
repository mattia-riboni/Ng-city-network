import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newUser } from '../components/models/sign-up';
import { AuthService } from './auth.service';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  GET_URL = `https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/.json?auth=`;
  REGISTER_URL = 'https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/.json';
  DELETE_URL = 'https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/'

  getUsers(token: string): any {
    return this.http.get(this.GET_URL + token)

  };

  registerUser(body: newUser){
    return this.http.post( this.REGISTER_URL , body)
  }

  deleteUser(id: string | number){
    return this.http.delete(this.DELETE_URL + id + '.json');
  }

  createNewUser(firstName: string, lastName: string, email: string, defaultCity: string, gender: string, posts: any[]){
    return this.http.post(this.REGISTER_URL, {
      first_name: firstName, last_name: lastName, email: email, default_city: defaultCity, gender: gender, posts: posts,
    })
  }

  editUser(id: string | number, body: any){
    return this.http.put(this.DELETE_URL + id + '.json', body)
  }


}
