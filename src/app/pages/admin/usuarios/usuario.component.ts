import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../../common/services/usuario/usuarios.service';
import { Usuario, Nivel } from '../../../common/interfaces/usuario.interface';
import { MensajesService } from '../../../common/services/shared/mensajes.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent {
  id_nivel_user: string;
  id_empresa: string;  
  id_cc: string;
  usuario: Usuario;
  niveles: Nivel;
  nivel: Nivel;
  centros: any;
  banderaCreate: boolean;
  hayCentros: boolean;
  // hayCentrosAdmin: boolean;
  banderaGuardar: boolean = true;
  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private mensaje: MensajesService
  ) { 
	  	this.usuario = {
	    	id: '',
	    	nombre: '',
	    	username: '',
	    	password: '',
	    	email: '',
	      	api_token: '',
	      	id_nivel: '',
	    	nivel: '',
	    	id_cc: '',
			nombre_cc: '',
			id_emp: '',
			img_name: '',
	    	status: true
		}
	
		this.id_nivel_user = '';
		this.nivel = {
			id: '',
			id_empresa: '',
			id_nom_nivel_user: '',
			nivel_user: '',
			nombre_nivel:''
		};		
	    
	    let user = JSON.parse(localStorage.getItem('currentUser'));
		this.id_nivel_user = user.id_nivel;
		this.id_empresa = user.id_empresa;
		this.id_cc = user.id_cc;

		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.banderaCreate = false;			
				this.cargarUsuario(data.id);
			} else {				
				this.banderaCreate = true;
				this.cargarCcsUserNuevo();
			}
		});

		let datos = {
			id_user: user.id,
			id_empresa: user.id_empresa
		};
		this.usuariosService.getNivelesUser(datos).subscribe((data: any) => {
			console.log('niveles', data);
			this.nivel = data[0];
			this.usuario.id_nivel = data[0].id;
		});
	}

	cargarUsuario(id: string) {
		this.usuariosService.getUsuario(id)
		.subscribe((obj: any) => {
			this.usuario = obj.data;
			this.cargarCcsUserUpdate(this.usuario);
		}, error => {
			this.mensaje.danger(error.error);
		});	
	}

	cargarCcsUserNuevo() {
		let datos = {
			id_cc: this.id_cc,
			id_empresa: this.id_empresa
		};

		// console.log('Datos nuevo', datos);
		
		this.usuariosService.getCcsClientNuevo(datos).subscribe((data: any) => {
			if(data.length != 0) {
				this.hayCentros = true;
				this.centros = data;
				// console.log(this.centros);
			} else {
				this.hayCentros = false;
			}
		});
	};

	cargarCcsUserUpdate(usuario: any) {
		let datos = {
			id_cc: usuario.id_cc,
			id_empresa: usuario.id_emp
		};
		// console.log('Datos update', datos);
		
		this.usuariosService.getCcsClientUpdate(datos).subscribe((data: any) => {
			if(data.length != 0) {
				this.hayCentros = true;
				this.centros = data;
				// console.log(this.centros);
			} else {
				this.hayCentros = false;
			}
		});
	}
	
	resetPass() {
		this.usuariosService.resetPass(this.usuario.id).subscribe( (data: any) => {
			this.mensaje.success(data.messaje);
		}, error => {
			this.mensaje.danger(error.messaje);		
		});
	}

	guardar(f: NgForm) {		
		if (f.valid) {
			this.usuariosService.createUsuario(this.usuario)
				.subscribe((data: any) => {
					this.mensaje.success(data, 'panel-adm/usuarios');
				}, error => {
					this.mensaje.danger(error.error);
				});
		} 
		//console.log(this.usuario);
	}
}
