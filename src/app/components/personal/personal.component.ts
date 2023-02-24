import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent {

  usersArr: any = [];
  users: any = [];
  captions: string[] = [];
  imgSrcs: string[] = [];
  last: number = 15;
  first: number = 0;
  likes: number [][] = [];
  liked: boolean = false;
  isPostLiked: any = []
  areCommentsOpened: boolean[][] = [];
  loadPost: number = 7;
  userId!: number;
  postId!: number;
  avatars: string[] = [];
  defaultCity: string = 'rome';
  city: string = this.defaultCity;
  token!: string;



  constructor(
    private router: Router,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService
    ){  }

  ngOnInit(): void {
    if (localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.token = user._token
      this.authService.createUser(user.email, user.id, user._token, user._expirationDate);
      this.getUsers(this.first, this.last);
      this.iterateCaptions(this.first, this.last);
      this.getCity();
    }

  };


  getUsers(start: number, end: number){

  this.usersService.getUsers(this.token).subscribe((users: any) => {
        this.usersArr = Object.keys(users).map((key) => {
          users[key]['id'] = key;
          return users[key]
        });
    if (this.loadPost <= 0){
    document.querySelector('.load-more')!.textContent = 'No More Posts'
    } else {
        if (end <= this.usersArr.length){
          for (let i = start; i < end; i++){
            let userLikes: boolean[] = [];
            let postComments: boolean[] = [];
            let avatarSrc: string = `https://api.lorem.space/image/face?w=${150 + i}&h=${150 + i}`;
            let imgSrc: string = `https://picsum.photos/${i + 500}/${i + 300}`;
            this.avatars.push(avatarSrc);
            this.users.push(this.usersArr[i])
            for (let x = 0; x < this.usersArr[i].posts.length; x++){
              this.imgSrcs.push(imgSrc);                         //pushing a random img for the posts in his array
              userLikes.push(false);                             //setting every post as unliked
              postComments.push(false);                          //setting every post as unopened
            }
            this.isPostLiked.push(userLikes)
            this.areCommentsOpened.push(postComments)
          }
        } else if (end > this.users.length) {
            this.loadPost--;
            this.getUsers(start, end);
        };
    }
  })};

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


  iterateCaptions(start: number, end: number){
    for (let i = start; i < end; i++){
      this.postsService.getCaption().subscribe(caption => {
          this.captions.push(caption);
      });
    }
  };

  loadMore(){
    this.first = this.last + 1;
    this.last = this.last + this.loadPost;

    this.getUsers(this.first, this.last);
    this.iterateCaptions(this.first, this.last);
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

}
