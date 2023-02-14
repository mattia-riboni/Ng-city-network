import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: any = [];

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): any {
    return this.http.get('https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(
      map((data: any) => {
        return data

      })
    )
  };

  getAvatar(): any{
    return this.http.get('https://api.lorem.space/image/face?w=150&h=150').pipe(
      map((data: any) =>{
        return data
      })
    )
  }

}
