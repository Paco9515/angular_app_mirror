import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../common/services/login/login.service';
import { Router } from '@angular/router';
import { Usuario } from '../../common/interfaces/usuario.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario_loggeado: Usuario;
  url_img: string;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { 
    this.usuario_loggeado = JSON.parse(localStorage.getItem('currentUser'));
    this.url_img = '/assets/img/avatars/' + this.usuario_loggeado.img_name;
    // console.log(this.url_img)
  }

  ngOnInit() {

  }

  logOut() {
    this.loginService.logoutUser();
    this.router.navigate(["/login"]);
  }

}
