import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project-1';

  city!: string;

  selectCity(city: string){
    this.city = city
    console.log(city)
  }
}

