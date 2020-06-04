import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../../common/services/usuario/usuarios.service';
import { Usuario, Nivel } from '../../../common/interfaces/usuario.interface';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';

@Component({
  selector: 'app-usuarioAdmin',
  templateUrl: './usuarioAdmin.component.html'
})
export class UsuarioAdminComponent { 
  usuario: Usuario;
  empresas: any;
  id_empresa: string;
  niveles: any;
  id_nivel: string;
  centros: any;
  banderaCreate: boolean;
  hayCentrosAdmin: boolean;
  desactivar1: boolean;
  desactivar2: boolean;
  constructor(
	private usuariosService: UsuariosService,
	private empresaService: EmpresaService,
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
		this.empresas = '';	
		this.id_empresa = '';
		this.niveles = '';
		this.id_nivel = '';
		this.desactivar1 = true;
		this.desactivar2 = true;
			

		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.banderaCreate = false;			
				this.cargarUsuario(data.id);
			} else {
				this.banderaCreate = true;
				this.empresaService.getSoloEmpresas().subscribe((data: any) => {
					// console.log('empresas', data.data);
					this.empresas = data.data;
				});				
			}
		});
	}

	cargarUsuario(id: string) {
		this.usuariosService.getUsuario(id)
		.subscribe((obj: any) => {
			this.usuario = obj.data;
			// console.log(this.usuario);
			this.cargarNiveles(this.usuario.id_emp);
		}, error => {
			this.mensaje.danger(error.error);
		});	
	}

	cargarNiveles(id_empresa: string) {
		this.desactivar1 = false;
		this.id_empresa = id_empresa;
			this.usuariosService.getNivelesUser('1').subscribe((data: any) => {
				// console.log('niveles', data);
				this.niveles = data;
			})
	}
    
    cargarCentrosByEmpresa(id_nivel: string) {
		// this.hayCentrosAdmin = false;
		let datos = {
			nivel: id_nivel,
			id_empresa: this.id_empresa
		};
        this.usuariosService.getCcsAdminByEmpresa(datos)
        .subscribe((data: any) => {
			// console.log('centros', data);            
            if (data.length != 0) {
				this.hayCentrosAdmin = true;
				this.centros = data; 
				this.usuario.id_cc = '';				               
            } else {
                this.hayCentrosAdmin = false;
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
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}
}
