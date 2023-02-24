import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(
    private authService: AuthService,
    private route: Router,
    private userService: UsersService ){}


  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;


    this.authService.signUp({email: email, password: password, returnSecureToken: true})
    .subscribe((data: any) => {
      this.route.navigate(['/login']);
    })
  }

}
