import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute ){}

  isLogged!: boolean

  ngOnInit(){
    this.onLogin()
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
    this.isLogged = false
  };

  log(){
    this.router.navigate(['/login']);
  }

  goPersonal(){
    this.router.navigateByUrl('/personal')
  }

  goGlobal(){
    this.router.navigateByUrl('/global')
  }

  goUsers(){
    this.router.navigateByUrl('/users')

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

  onLogin(){
    this.route.params.subscribe((params: any) => {
     if (localStorage.getItem('user') || params['logged']){
      return this.isLogged = true
     } else {
      return this.isLogged = false
     }
    })
  }
}
