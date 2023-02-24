import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent {

  createNewPost(form: NgForm){
    console.log(form)
  }

}
