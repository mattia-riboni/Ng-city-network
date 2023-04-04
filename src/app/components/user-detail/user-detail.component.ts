import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  param: number;
  token: string;
  usersArr: any = [];
  user: any = {};
  avatar: string = `https://api.lorem.space/image/face?w=150&h=150`;
  imgSrcs: string[] = [];
  isPostLiked: boolean[] = [];
  areCommentsOpened: boolean[] = [];
  newPostOpened: boolean = false;
  editingUserOpened: boolean = false;
  editingPostsOpened: boolean = false;
  status: string;
  selectedCategory: string;
  gender: string;
  postEditing: boolean = false;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertController: AlertController,
  ){ }

  ngOnInit() {
    if (localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.token = user._token
      this.authService.createUser(user.email, user.id, user._token, user._expirationDate);
      this.param = +this.route.snapshot.paramMap.get('id')!
      this.getUser()
    }
  }

  onSelectStatus(status: any){
    this.status = status.detail.value
  };

  onSelectCategory(category: any){
    this.selectedCategory = category.detail.value
  }

  createNewPost(form: NgForm){
    let _private: boolean;
    if(this.status == 'private'){
      _private = true;
    } else {
      _private = false;
    }

    let newPost = {caption: form.value.caption, title: form.value.title, city: form.value.city, private: _private, category: this.selectedCategory, photo: 'https://picsum.photos/500/300', likes: 0, comments: []}
    this.user.posts.push(newPost);

    this.usersService.editUser(this.user.id, this.user).subscribe((data:any) =>
    console.log(data))
    this.presentAlert('','','Post Added' );
    this.newPost();
    this.imgSrcs.push('https://picsum.photos/500/300')
  }

  newPost(){
    this.newPostOpened = !this.newPostOpened
    this.editingUserOpened = false;
    this.editingPostsOpened = false;
  }

  editingUser(){
    this.editingUserOpened = !this.editingUserOpened;
    this.newPostOpened = false;
    this.editingPostsOpened = false;
  }

  editingPosts(){
    this.editingPostsOpened = !this.editingPostsOpened;
    this.newPostOpened = false;
    this.editingUserOpened = false;
  }

  editUser(form: NgForm){
    this.user.first_name = form.value.firstName;
    this.user.last_name = form.value.lastName;
    this.user.email = form.value.email;
    this.user.gender = this.gender;
    this.user.default_city = form.value.city

    this.usersService.editUser(this.user.id, this.user).subscribe()
    this.editingUserOpened = false;
    this.presentAlert('','','User infromations updated')
  };

  openEditPost(){
    this.postEditing = !this.postEditing;
  }

  editPost(form: NgForm, postId: number){
    this.user.posts[postId].title = form.value.title;
    this.user.posts[postId].caption = form.value.caption;
    this.user.posts[postId].city = form.value.city;
    this.user.posts[postId].category = this.selectedCategory;
    this.user.posts[postId].status = this.status;
    this.usersService.editUser(this.user.id, this.user).subscribe()
    this.postEditing = false;
    this.presentAlert('','','Post Edited')
  }


  getUser(){
    this.usersService.getUsers(this.token).subscribe((users: any) => {
        this.usersArr = Object.keys(users).map((key) => {
          users[key]['id'] = key;
          return users[key]
        });
      this.user = (this.usersArr[this.param]);
        this.pushImgSrc();
        this.pushPostNotLiked();
        this.pushCommentsUnopened();
    });
  };

  pushImgSrc(){
    for (let i = 0; i < this.user.posts.length; i++){
      let imgsrc = `https://picsum.photos/${i + 500}/${i + 300}`;
      this.imgSrcs.push(imgsrc);
    }
  }

  pushPostNotLiked(){
    for (let i = 0; i < this.user.posts.length; i++){
      this.isPostLiked.push(false);
    }
  }

  pushCommentsUnopened(){
    for (let i = 0; i < this.user.posts.length; i++){
      this.areCommentsOpened.push(false);
    }
  }

  onChangeGender(gender: any){
    this.gender = gender.detail.value;
  }

  like(post: number){
    if (!this.isPostLiked[post]){
      this.isPostLiked[post] = true;
      this.user.posts[post].likes++
    } else{
      this.isPostLiked[post] = false;
      this.user.posts[post].likes--
    }
  }

  toggleComments(post: number){
    this.areCommentsOpened[post] = !this.areCommentsOpened[post];
  };

  publishComment(form: NgForm, post: number){
    this.user.posts[post].comments.push({name: form.value.name, comment: form.value.comment})
    this.usersService.editUser(this.user.id, this.user).subscribe()
    this.resetForm(form)
  }

  resetForm(form: NgForm): boolean{
    form.reset();
    return true;
  }

  async presentAlert(user: string, subHeader: string, message:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: `${subHeader}`,
      message: `${user} ${message}`,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
