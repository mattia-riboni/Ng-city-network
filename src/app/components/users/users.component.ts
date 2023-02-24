import { Component, OnDestroy, OnInit } from '@angular/core';
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

  ngOnInit(){
     if (localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.token = user._token
      this.authService.createUser(user.email, user.id, user._token, user._expirationDate);
      this.getUsers();
    }
  }

    getUsers(){
      this.usersService.getUsers(this.token).subscribe((users: any) => {

        this.usersArr = Object.keys(users).map((key) => {
          users[key]['id'] = key;
          return users[key]
        });
        for (let i = 0; i < this.usersArr.length; i++){
          let avatarSrc: string = `https://api.lorem.space/image/face?w=${150 + i}&h=${150 + i}`;
          this.users.push(this.usersArr[i])
          this.avatars.push(avatarSrc);
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

    deleteUser(id: string, user:string, index: number | string, isFake: boolean){
      this.usersService.deleteUser(id).subscribe();
      this.users.splice(index, 1)
      this.presentAlert(user, 'User Deleted', 'has been deleted' )
    }

    createUser(){
      this.creatingNewUser = !this.creatingNewUser;
    }

    onSelectGender(gender: any){
      this.gender = gender.detail.value
      console.log(this.gender)
    }

    createNewUser(form: NgForm){
      let firstName = form.value.firstName;
      let lastName = form.value.lastName;
      let email = form.value.email;
      let city = form.value.city;
      this.usersService.createNewUser(firstName, lastName, email, city, this.gender).subscribe()
      this.users.push({ first_name: firstName, last_name: lastName, email: email, default_city: city, gender: this.gender })
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
