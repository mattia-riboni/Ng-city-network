import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';
import { newUser } from '../components/models/sign-up';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getUsers(token: string): any {
    return this.http.get(`https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/.json?auth=${token}`)

  };

  registerUser(body: newUser){
    return this.http.post('https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/.json', body)
  }

  deleteUser(id: string | number){
    return this.http.delete(`https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/${id}.json`)
  }

  createNewUser(firstName: string, lastName: string, email: string, defaultCity: string, gender: string){
    return this.http.post('https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/.json', {
      first_name: firstName, last_name: lastName, email: email, default_city: defaultCity, gender: gender,
    })
  }

  editUser(id: string | number, body: any){
    return this.http.put(`https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/${id}.json`, body)
  }


}
