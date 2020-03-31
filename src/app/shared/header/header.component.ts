import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../common/services/login/login.service';
import { Router } from '@angular/router';
import { Usuario } from '../../common/interfaces/usuario.interface';
import { UsuariosService } from '../../common/services/usuario/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario_loggeado: Usuario;
  url_img: string;
  constructor(
    private userService: UsuariosService,
    private loginService: LoginService,
    private router: Router
  ) { 
    this.usuario_loggeado = JSON.parse(localStorage.getItem('currentUser'));
    //this.url_img = 'http://localhost:8000/assets/images/users/'+this.usuario_loggeado.img_name;
    this.get_imagen();    
  }

  get_imagen() {
    this.userService.getImage(this.usuario_loggeado.id).subscribe((data: any) => {
    this.url_img = data.ruta;
  });
}

  ngOnInit() {

  }

  logOut() {
    this.loginService.logoutUser();
    this.router.navigate(["/login"]);
  }

}
