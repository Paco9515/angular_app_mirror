import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {
  
  nivel: number;

  constructor() { 
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.nivel = user.id_nivel;
    // console.log(this.nivel);
  }

  ngOnInit() {
  }

}
