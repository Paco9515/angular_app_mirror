import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { Ccosto } from 'src/app/common/interfaces/ui.interface';
// import { EmpresaService } from 'src/app/common/services/ui/empresa.service';
// import { UnidadesAdminService } from 'src/app/common/services/ui/unidadesAdmin.service';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';

@Component({
  selector: 'app-ccosto',
  templateUrl: './ccosto.component.html',
  styles: []
})
export class CcostoComponent {

	id: string;
	usuario: any;
	ccosto: Ccosto;
	unidad: any;
	subs: any;
	id_nivel: string;
	id_empresa: string;
	id_cc: string;
	nivel: any;
	ubicacion: any;
	aentamientos: any;
	banderaNivel: boolean;
	banderaUnidad: boolean;
    banderaPadre: boolean;
    banderaFirstCc: boolean;
	
	banderaCreate: boolean;
	banderaTipo: string;
	banderaDigitos: boolean;
	banderaResp: boolean = false;

	constructor(
		private ccostoService: CcostoService,		
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService
	) {
		this.id = '';
		this.ccosto = {
			id: '',
			id_ubicacion_geografica: '',
			id_unidad_adm: '',
			id_subfuncion: '',
			id_nivel: '',
			id_padre: '',
			codigo: '',
			nombre: '',
			calle: '',
			num_exterior: '',
			num_interior: '',
			longitud: '',
			latitud: '',
			responsable_ley: false,
			status: true,
			id_empresa: ''
		};
		this.ubicacion = {
			cp: '',
			nombre_estado: '',
			nombre_municipio: '',
			asentamientos: ''
		}

		this.unidad = ''
		this.subs = '';
		this.id_nivel = '';
		this.id_empresa = '';
		this.id_cc = '';
		this.nivel = '';
		this.banderaTipo = 'admin';
		this.banderaDigitos = false;

		let usuario = JSON.parse(localStorage.getItem('currentUser'));
		this.usuario = usuario;
		this.id_cc = usuario.id_cc;

		/* if(usuario.id_nivel == null || usuario.id_nivel == 1) {
			this.ccostoService.getResponsable().subscribe((resp: any) => {
				if(resp) {
					this.banderaResp = true;
				}
			});
		} */

		this.activatedRoute.params.subscribe((data: any) => {
			// console.log(data);
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.banderaCreate = false;				
				this.ccostoService.getCcosto(this.id).subscribe((obj: any) => {						
					// console.log('centro', obj.data);
					this.ccosto = obj.data;	
					this.ccostoService.getUbicacion(this.ccosto.id_ubicacion_geografica).subscribe((ubicacion: any) => {
						// console.log('ubicacion', ubicacion);
						this.ubicacion.cp = ubicacion.codigo_postal;
						this.getUbicacion();
					});
					this.cargarNiveles(usuario.id_empresa);		
				});
			} else {
				// console.log('empresas', empresas.data);
				this.banderaCreate = true;				
				this.cargarNiveles(usuario.id_empresa);
			}
		});
	}
	
	cargarNiveles(id_empresa: string) {	

		this.id_empresa = id_empresa;
		this.ccostoService.getNivelesCcClient(this.usuario.id_cc).subscribe((nivel: any) => {
			// console.log('niveles', nivel);
			if(nivel.length == 0) {
				let mensaje = { 
					message: 'Aun no se han registrado Niveles.',
					title: 'Error'
				}
				this.mensaje.danger(mensaje);
			} else {
				this.nivel = nivel[0];
				this.ccosto.id_nivel = nivel[0].id;				
			}
		});

		this.ccostoService.getUnidadCcClient(this.id_cc).subscribe((unidad: any) => {
			// console.log('unidad', unidad);
			this.unidad = unidad[0];
			this.ccosto.id_unidad_adm = unidad[0].id;
		});

		this.ccostoService.getSubfunciones().subscribe((subs: any) => {
			// console.log('subs', subs);
			this.subs = subs;
		});		
	}
	

	getUbicacion() {
		// console.log(this.ubicacion.cp);
		let numero = this.ubicacion.cp.toString();
		
		if(numero.length != 5){
			this.banderaDigitos = true;
		} else {
			this.banderaDigitos = false;
			this.ccostoService.getUbicaciones(this.ubicacion.cp).subscribe((ubicacion: any) => {
				// console.log(ubicacion.data);	
					this.ubicacion = ubicacion.data;
					this.ubicacion.cp = numero;						
			}, error => {
				// console.log('error ubicacion', error.error);
				this.mensaje.danger(error.error);
			});
		}
	}

	guardar(f: NgForm) {
		let cp = this.ubicacion.cp.toString();
		this.ccosto.id_padre = this.usuario.id_cc;
		this.ccosto.id_empresa = this.usuario.id_empresa;
		// console.log('info a guardar', this.ccosto);
		if(cp.length != 5) {
			let mensaje = { 
				message: 'El codigo Postal debe constar de 5 digitos.',
				title: 'Error'
			}
			this.mensaje.danger(mensaje);
		} else {
			if (f.valid) {
				this.ccostoService.createCcosto(this.ccosto)
				.subscribe((response: any) => {
					// console.log(response);
					return this.mensaje.success(response, 'panel-adm/ccostos');
				}, error => {
					// console.log(error.error);
					return this.mensaje.danger(error.error);
				});
			} 
		// console.log(this.ccosto);
		}
		
		
	}

}

