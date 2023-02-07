import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  liked: boolean = false;
  likes: number = 347;
  postsArr: Array<[]> = [];


  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('https://city-project-angular-default-rtdb.europe-west1.firebasedatabase.app/users.json')
  }

  getPublicPosts(){

    return this.getData().pipe(map((data: any) => {
      let arr = [];
      let postsArr: any[] = [];
      for (let i = 0; i < data.length; i++){
        arr.push(data[i])
      };
      arr.forEach(user => {
        for (let x = 0; x < user.posts.length; x++){
          postsArr.push(user.posts[x])
        }
      });
      let filteredArr = postsArr.filter(post =>
        post.private === false && post.city === 'rome'
      );
      return filteredArr
    }))
  }

  getCaption(){
    return this.http.get('https://api.quotable.io/random').pipe(
      map((data: any) => {
        let caption = data.content
        return caption;
      })
    )
  };
}
