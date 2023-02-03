import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  constructor(private router: Router) {}

  closeComments(){
    this.router.navigateByUrl('global')
  }

}
