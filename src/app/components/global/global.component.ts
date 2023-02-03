import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent {

  liked: boolean = false;
  likes: number = 347

  constructor(private router: Router){}

  like() {
    if (this.liked){
      this.likes--
    } else{
      this.likes++
    }
    return this.liked = !this.liked
  };

  openComments(){
    this.router.navigateByUrl('global/comments');
  }
}
