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
  id_cc_user: string;  
  usuario: Usuario;
  niveles: Nivel;
  nivel: Nivel;
  centros: any;
  banderaCreate: boolean;
  banderaAdmin: boolean;
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
			img_name: '',
	    	status: true
	    }
	
		this.id_nivel_user = '';
		this.nivel = {
			id: '',
			nivel:''
		};
		/* this.centros = {
			id: '',
			nombre: ''
		} */
	    
	    let user = JSON.parse(localStorage.getItem('currentUser'));
		this.id_nivel_user = user.id_nivel;
		this.id_cc_user = user.id_cc;
		// console.log('nivel', this.id_nivel_user);
		
		if (this.id_nivel_user != "1") {
			this.banderaAdmin = false;						
		} else {
			this.banderaAdmin = true;			
		}

		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				// console.log(data);				
				this.cargarUsuario(data.id);
			} else {
				let nivel = this.id_nivel_user + 1;
				this.cargarCentros(nivel);
			}
		});
	
		this.usuariosService.getNivelesUser(this.id_nivel_user)
			.subscribe((data: any) => {
			// console.log(data);
			if (data.length == 1) {
				this.nivel = data[0];
				this.usuario.id_nivel = this.nivel.id;
				this.usuario.nivel = this.nivel.nivel;
				// console.log('data 1', this.niveles);
			} else {
				this.niveles = data;
				// console.log('data > 1', this.niveles);
			}
		});
	}

	cargarUsuario(id: string) {
		this.usuariosService.getUsuario(id)
		.subscribe((obj: any) => {
			this.usuario = obj.data;
			this.cargarCentros(this.usuario.id_nivel);
		}, error => {
			this.mensaje.danger(error.error, 'panel-adm/usuarios');
		});	
	}

	cargarCentros(id_nivel: string) {
		// console.log(id_nivel);
		if (this.banderaAdmin) {
			this.usuariosService.getCcsAdmin(id_nivel)
			.subscribe((data: any) => {
			this.centros = data;	
			// console.log('traje centros admin', this.centros);			
			});
		} else {
			this.usuariosService.getCcsClient(this.id_cc_user)
			.subscribe((data: any) => {
				this.centros = data;	
				// console.log('traje centros cliente', this.centros);			
			});
		}

		
	}

	guardar(f: NgForm) {		
		if (f.valid) {
			this.usuariosService.createUsuario(this.usuario)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}
}
