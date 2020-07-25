import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/common/services/usuario/usuarios.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent {
  
  nivel: number;
  banderaMostrarNiveles: boolean;
  banderaMostrarUsuarios: boolean;
  banderaMostrarEmpresas: boolean;
  banderaMostrarUnidades: boolean;
  banderaMostrarCentros: boolean;
  banderaMostrarUi: boolean;
  soyOfiUnidad: boolean;


  constructor(
    private userService: UsuariosService
  ) { 
    let user = JSON.parse(localStorage.getItem('currentUser'));
    // this.nivel = user.nivel_user;
    // console.log('id_nivel', user.id_nivel);
    if(user.id_nivel == null) {
      this.banderaMostrarEmpresas = true;
    } else {
      this.banderaMostrarEmpresas = false;
    }

    // console.log('info user: '+user.oficina_unidad);
    if(user.oficina_unidad == true) {      
      this.soyOfiUnidad = true;
    } else {      
      this.soyOfiUnidad = false;
    }
    // console.log('soy unidad: '+this.soyOfiUnidad);

    if(user.id_nivel == null || user.id_nivel == 1) {
      // console.log('admin');      
      this.banderaMostrarUnidades = true;
      this.banderaMostrarNiveles = true;
      // this.banderaMostrarUi = true;
    } else {
      // console.log('no admin');
      this.banderaMostrarEmpresas = false;
      this.banderaMostrarUnidades = false;
      this.banderaMostrarNiveles = false;
    }

    this.userService.get_last_level_user_by_company(user.id_empresa).subscribe((level: any) => {
      // console.log('usuarios', [user.id_nivel, level.nivel_user]);
      if(user.id_nivel == level.nivel_user) {
        // console.log('ultimo nivel');
        this.banderaMostrarUsuarios = false;
        this.banderaMostrarCentros = false;
        if(!this.banderaMostrarEmpresas && !this.banderaMostrarUnidades && !this.banderaMostrarCentros){
          // console.log('muestro ui');
          this.banderaMostrarUi = false;
        }
        else {
          // console.log('no muestro ui');
          this.banderaMostrarUi = true;
        }
      } else {
        // console.log('diferente de ult nivel');
        this.banderaMostrarUsuarios = true;
        this.banderaMostrarCentros = true;
        this.banderaMostrarUi = true;
      }
    });    
  }
}
