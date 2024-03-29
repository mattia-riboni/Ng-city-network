import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent {

  usersArr: any = [];
  users: any = [];
  imgSrcs: string[] = [];
  likes: number [][] = [];
  liked: boolean = false;
  isPostLiked: any = []
  areCommentsOpened: boolean[][] = [];
  userId!: number;
  postId!: number;
  avatars: string[] = [];
  defaultCity: string = 'rome';
  city: string = this.defaultCity;
  token!: string;



  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService
    ){  }

  ngOnInit(): void {
    if (localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.token = user._token
      this.authService.createUser(user.email, user.id, user._token, user._expirationDate);
      this.getUsers();
      this.getCity();
    }

  };


  getUsers(){

    this.usersService.getUsers(this.token).subscribe((users: any) => {

      this.usersArr = Object.keys(users).map((key) => {
        users[key]['id'] = key;
        return users[key]
      });
      this.pushAvatars();
      this.pushImgs();
      this.pushUserLikes();
      this.pushComments();
      this.pushUserLikes();
      for (let i = 0; i < this.usersArr.length; i++){
        this.users.push(this.usersArr[i])
      }
    })};

    pushAvatars(){
      for (let i = 0; i < this.usersArr.length; i++){
        let gender = this.usersArr[i].gender;
        if (gender === 'other'){
          gender = 'female'
        }
        let avatarSrc: string = `https://xsgames.co/randomusers/avatar.php?g=${gender}`;
        this.avatars.push(avatarSrc);
      }
    }


    pushImgs(){
      for (let i = 0; i < this.usersArr.length; i++){
        let imgSrc: string = `https://picsum.photos/${i + 500}/${i + 300}`;
        for (let x = 0; x < this.usersArr[i].posts.length; x++){
          this.imgSrcs.push(imgSrc);                         //pushing a random img for the posts in his array
        }
      }
    };

    pushUserLikes(){
      for (let i = 0; i < this.usersArr.length; i++){
        let userLikes: boolean[] = [];
        for (let x = 0; x < this.usersArr[i].posts.length; x++){
          userLikes.push(false);  //setting every post as unliked
        }
        this.isPostLiked.push(userLikes);
      }

    }

    pushComments(){
      for (let i = 0; i < this.usersArr.length; i++){
        let postComments: boolean[] = [];
        for (let x = 0; x < this.usersArr[i].posts.length + 1; x++){
          postComments.push(false);                          //setting every post comments as unopened
        }
        this.areCommentsOpened.push(postComments)
      }
    }

  like(user: number, post: number){
    if (!this.isPostLiked[user][post]){
      this.isPostLiked[user][post] = true;
      this.users[user].posts[post].likes++
    } else{
      this.isPostLiked[user][post] = false;
      this.users[user].posts[post].likes--
    }
  }

  toggleComments(user: number, post: number){
    this.areCommentsOpened[user][post] = !this.areCommentsOpened[user][post];
  };

  closeBanner(){
    document.querySelector('.banner')?.remove();
  };

  getCity(){
    this.route.queryParams.subscribe( params => {
      if (!params['city']){
        this.city = this.defaultCity
      } else{
      this.city = params['city']
      }
    })
  }

  publishComment(form: NgForm, user: number, post: number){
    this.users[user].posts[post].comments.push({name: form.value.name, comment: form.value.comment})
    this.usersService.editUser(user, this.users[user]).subscribe()
    this.resetForm(form);
  }

  resetForm(form: NgForm): boolean{
    form.reset();
    return true;
  }

}
