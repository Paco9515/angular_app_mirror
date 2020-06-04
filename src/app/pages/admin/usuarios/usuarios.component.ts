import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../common/services/usuario/usuarios.service';
// import { $ } from 'protractor';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  user: any;
  usuarios: any; 
  nivel: number;
  cargado: boolean = false;
  banderaAdmin: boolean; 
  empresas: any;
  constructor(
    private usuariosService: UsuariosService,
    private empresaService: EmpresaService,
    private mensaje: MensajesService
  ) { 
    this.nivel = null;    
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.user = user;
    this.nivel = user.id_nivel;

    if (this.nivel != null) {
			this.banderaAdmin = false;						
		} else {
      this.banderaAdmin = true;	
      this.empresaService.getEmpresas().subscribe((data: any) => {
        this.empresas = data;
      });		
		}   
    this.inicio();
  }

  inicio() {
    if(this.banderaAdmin == true) {
      this.cargarUsuarios('1');
    } else {
      this.getUsers(this.user);
    }
  }

  getUsers(user: any) {
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

  cargarUsuarios(id_empresa: string) {
    // console.log(id_empresa);
    this.usuariosService.getUserXEmpresa(id_empresa).subscribe((data: any) => {
      // console.log(data);
      if (data.length > 0) {
        this.cargado = true;
      }
      this.usuarios = data;
    });
  }
  

  deleteUser(id: string) {
		// this.programas = (this.programas.filter(data => data.id === id));
		this.usuariosService.deleteUser(id)
			.subscribe((response: any) => {
        this.mensaje.success(response);
        this.getUsers(this.user.id);
      }, error => {
        this.mensaje.danger(error.error);
        this.getUsers(this.user.id);
      });
	}
}
