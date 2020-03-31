import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../common/services/usuario/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  user: any;
  usuarios: any; 
  nivel: number;
  cargado: boolean = false; 
  constructor(
    private usuariosService: UsuariosService
  ) { 
    this.nivel = null;
    
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.nivel = user.id_nivel;

    this.usuariosService.getUsuarios(user.id).subscribe((data: any) => {
      // console.log(data);
      if (data.length > 0) {
        this.cargado = true;
      } 

      this.usuarios = data;      
    });
  }

  ngOnInit() {
  }

}
