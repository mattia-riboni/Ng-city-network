import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  liked: boolean = false;
  likes: number = 347;
  postsArr: Array<[]> = [];
  city: string = document.querySelector('ion-searchbar')!.value!


  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/.json')
  };

  getComments(){
    return this.getData().pipe(
      map((data: any) => {
        let commentsArr = [];
        for (let i = 0; i < data.length; i++){
          let userComments: string[] = [];
          for (let x = 0; x < data[i].posts.length; x++){
            userComments.push(data[i].posts[x])
          }
          commentsArr.push(userComments);
        }
        return commentsArr;
      })
    )
  }

  getCaption(){
    return this.http.get('https://api.quotable.io/random').pipe(
      map((data: any) => {
        let caption = data.content
        return caption;
      })
    )
  };

  getAuthor(){
    return this.getData().pipe(
      map((data: any) => {
        let users: string[] = [];
        for (let i = 0; i < data.length; i++){
          users.push(data[i].first_name + ' ' + data[i].last_name)
        }
        return users;
      })
    )
  };

}
