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

  logout(){
    this.router.navigate(['/global'])
    return this.isLogged=!this.isLogged
  };

  log(){
    this.router.navigate(['/signup']);
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

  goAccount(){
    this.router.navigateByUrl('/user')
  }

  goMyPosts(){
    this.router.navigateByUrl('/myposts')
  }

  searchCity(city: any){
    this.router.navigate(
      ['/global'],
      { queryParams: {city: city} } );
  }


}
