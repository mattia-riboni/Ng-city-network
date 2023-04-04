import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ){ }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login({email: email, password: password, returnSecureToken: true}).subscribe((data: any) =>{
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
      this.authService.createUser(data.email, data.localId, data.idToken, expirationDate);
      localStorage.setItem('user', JSON.stringify(this.authService.user));
      this.router.navigate(['/global'], { queryParams: {logged: true}})
    }, () => {
      this.resetForm(form);
      alert('Email or password not correct')
    })
  };

  resetForm(form: NgForm): boolean{
    form.reset();
    let resetted = true;
    return resetted;
  }

}

