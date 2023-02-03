import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent {

  constructor(private router: Router){}


  isLogged: boolean = true

  log(){
    return this.isLogged=!this.isLogged
  }

  goPersonal(){
    this.router.navigateByUrl('/personal')
  }

  goGlobal(){
    this.router.navigateByUrl('/')
  }

  goNotifications(){
    this.router.navigateByUrl('/notifications')

  }

}
