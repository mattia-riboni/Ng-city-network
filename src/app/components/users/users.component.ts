import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private alertController: AlertController,
  ){ }

    token!: string;
    usersArr: any = [];
    users: any = []
    avatars: string[] = []
    search: boolean = false;
    searchResults: any[] = [];
    deleting: boolean = false;
    creatingNewUser: boolean = false;
    gender: string;
    showUsers: any = 10;

  ngOnInit(){
     if (localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.token = user._token
      this.authService.createUser(user.email, user.id, user._token, user._expirationDate);
      this.getUsers();
    }
  }

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


    getUsers(){
      this.usersService.getUsers(this.token).subscribe((users: any) => {

        this.usersArr = Object.keys(users).map((key) => {
          users[key]['id'] = key;
          return users[key]
        });
        this.pushAvatars();
        if (this.usersArr.length < 10 || this.showUsers == 'all'){
          for (let i = 0; i < this.usersArr.length; i++){
            this.users.push(this.usersArr[i])
          }
        } else {
            for (let i = 0; i < this.showUsers; i++){
              this.users.push(this.usersArr[i])
            }
          }
      })};

    searchUser(name: string | undefined | null){
      let fullName = name!.split(' ');
      let firstName = fullName[0].toLowerCase();
      let result;
      if (fullName[1]){
        let lastName = fullName[1].toLowerCase();
        result = this.users.find((user: any) => user.first_name.toLowerCase() == firstName &&
        user.last_name.toLowerCase() == lastName);
      } else {
        result = this.users.find((user: any) => user.first_name.toLowerCase() == firstName ||
        user.email.toLowerCase() == name?.toLowerCase() || user.last_name.toLowerCase() == name?.toLowerCase())
      }
      this.searchResults.push(result)
      this.search = true;
      console.log(this.searchResults)
      }

    goBack(){
      this.searchResults = []
      this.search = false
    }

    showDelete(){
      this.deleting = !this.deleting
    }

    deleteUser(id: string, user:string, index: number | string){
      this.usersService.deleteUser(id).subscribe();
      this.users.splice(index, 1)
      this.presentAlert(user, 'User Deleted', 'has been deleted' )
    }

    createUser(){
      this.creatingNewUser = !this.creatingNewUser;
    }

    onSelectShowUsers(number: any){
      this.showUsers = number.detail.value;
      this.users = [];
      this.usersArr = [];
      this.getUsers();
    }

    onSelectGender(gender: any){
      this.gender = gender.detail.value;
    }

    createNewUser(form: NgForm){
      let firstName = form.value.firstName;
      let lastName = form.value.lastName;
      let email = form.value.email;
      let city = form.value.city;
      let firstPost = {caption: 'This is your first post, try to edit it using the "Edit Post Button"', city: 'city', category: 'category', likes: 0, private: true, title: 'Your first post', comments: [{}]}
      this.usersService.createNewUser(firstName, lastName, email, city, this.gender, [firstPost]).subscribe()
      this.users.push({ first_name: firstName, last_name: lastName, email: email, default_city: city, gender: this.gender, posts:[firstPost] })
      this.avatars.push('https://api.lorem.space/image/face?w=150&h=150')
      this.creatingNewUser = false;
      this.presentAlert(form.value.firstName + ' ' + form.value.lastName, 'User added', 'has been added')
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
