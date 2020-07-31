import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { Ccosto } from 'src/app/common/interfaces/ui.interface';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';


@Component({
  selector: 'app-ccostoAdmin',
  templateUrl: './ccostoAdmin.component.html',
  styles: []
})
export class CcostoAdminComponent {

  	id: string;
	ccosto: Ccosto;
	centros: any;
	unidades: any;
	subs: any;
	empresas: any;
	id_nivel: string;
	id_empresa: string;
	id_cc: string;
	niveles: any;
	ubicacion: any;
	aentamientos: any;
	banderaNivel: boolean;
	banderaUnidad: boolean;
    banderaPadre: boolean;
    banderaFirstCc: boolean;
	
	banderaCreate: boolean;
	banderaTipo: string;
	banderaDigitos: boolean;
	banderaResp: boolean;

	constructor(
		private empresaService: EmpresaService,
		private ccostoService: CcostoService,		
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService
	) {
		this.id = '';
		this.ccosto = {
			id: '',
			id_ubicacion_geografica: '',
			id_unidad_adm: '',
			codigo_unidad: '',
			nom_unidad: '',
			id_subfuncion: '',
			id_nivel: '',
			id_padre: '',
			id_usuario: '',
			codigo: '',
			nombre: '',
			calle: '',
			num_exterior: '',
			num_interior: '',
			longitud: '',
			latitud: '',
			responsable_ley: false,
			oficina_unidad: false,
			status: true,
			id_empresa: ''
		};
		this.ubicacion = {
			cp: '',
			nombre_estado: '',
			nombre_municipio: '',
			asentamientos: ''
		}
		

		this.centros = '';
		this.unidades = ''
		this.subs = '';
		this.empresas = '';
		this.id_nivel = '';
		this.id_empresa = '';
		this.id_cc = '';
		this.niveles = '';
		this.banderaTipo = 'admin';
		this.banderaDigitos = false;

		let usuario = JSON.parse(localStorage.getItem('currentUser'));
    	if(usuario.nivel == 1 || usuario.nivel == 2) {
			this.banderaResp = true;
		} else {
			this.banderaResp = false;
		}
		
		this.ccostoService.getResponsable().subscribe((resp: any) => {
			if(resp) {
				this.banderaResp = true;
			}
		});

		this.ccostoService.getSubfunciones().subscribe((subs: any) => {
			// console.log('subs', subs);
			this.subs = subs;
		});

		this.activatedRoute.params.subscribe((data: any) => {
			// console.log(data);
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.banderaCreate = false;
				this.ccostoService.getCcosto(this.id).subscribe((obj: any) => {						
					console.log('centro', obj.data);
					this.ccosto = obj.data;
					if(this.ccosto.id_padre == null) {
						this.ccosto.id_padre = '';
					}
					this.banderaCreate = false;
					this.banderaTipo = 'existe';
					this.banderaUnidad = false;
					this.banderaNivel = false;
					this.banderaPadre = false;
					this.ccostoService.getUbicacion(this.ccosto.id_ubicacion_geografica).subscribe((ubicacion: any) => {
						// console.log('ubicacion', ubicacion);
						this.ubicacion.cp = ubicacion.codigo_postal;
						this.getUbicacion();
					});
					this.cargarNiveles(this.ccosto.id_empresa, true);					
					
				});
			} else {				
				this.banderaCreate = true;			
                this.empresaService.getSoloEmpresas().subscribe((empresas: any) => {
					// console.log('empresas', empresas.data);
					this.banderaCreate = true;
					this.banderaTipo = 'nuevo';
                    this.empresas = empresas.data;
				}); 
				
				this.banderaUnidad = true;
				this.banderaNivel = true;
				this.banderaPadre = true;				
			}
		});
	}
	
	cargarNiveles(id_empresa: string, first?: boolean) {	
		if(!first) {
			this.banderaUnidad = true;
			this.banderaNivel = true;
			this.banderaPadre = true;
			this.ccosto.id_nivel = '';
			this.ccosto.id_unidad_adm = '';
			this.ccosto.id_padre = '';
		}

		this.id_empresa = id_empresa;
		this.ccostoService.validateFirstCc(id_empresa).subscribe((datos: any) => {
			// console.log('validar', datos);
			if(this.banderaCreate) {
				if(datos.length == 0) {					
					this.banderaFirstCc = true;
					this.cargarNivelesPt2('0');
				} else {
					this.banderaFirstCc = false;
					this.cargarNivelesPt2('1');
				}
			} else {
				if(this.ccosto.id_nivel == '2') {
					this.banderaPadre = true;
					// console.log('edito cabildo');
					// this.banderaFirstCc = false;
					this.cargarNivelesPt2('0');	
					this.cargarUnidades(this.ccosto.id_nivel, true);				
				} else {
					// console.log('edito cualquier otro');
					// this.banderaFirstCc = false;
					this.cargarNivelesPt2('1');	
					this.cargarUnidades(this.ccosto.id_nivel, true);			
				}
			}			
		});
	}
	// this.cargarUnidades(this.ccosto.id_unidad_adm, true);

	cargarNivelesPt2(opcion: string) {
		let datos = { empresa: this.id_empresa, bandera: opcion }
		this.ccostoService.getNiveles(opcion).subscribe((niveles: any) => {
			// console.log('niveles', niveles);
			if(niveles.data.length == 0) {
				this.banderaNivel = true;
				let mensaje = { 
					message: 'Aun no se han registrado Niveles.',
					title: 'Error'
				}
				this.mensaje.danger(mensaje);
			} else {
				// console.log('niveles', niveles.data);
				// console.log('id_nivel', this.ccosto.id_nivel);
				this.banderaNivel = false;
				this.niveles = niveles.data;				
			}
		});
	}

	/* cargarUnidades(nivel: string, first?: boolean) {
		if(!first) {
			this.banderaUnidad = true;
			this.banderaPadre = true;
			this.ccosto.id_unidad_adm = '';
			this.ccosto.id_padre = '';
		}
		
		this.id_nivel = nivel;
		if(this.banderaFirstCc) {	
			this.cargarUnidadesPt2('0');
		} else {
			if(!this.banderaCreate) {
				if(this.ccosto.id_nivel == '2') {
					this.cargarUnidadesPt2('0');
				} else {
					this.cargarUnidadesPt2('1');
				}				
			} else {
				this.cargarUnidadesPt2('1');	
			}		 
		} 	
	} */

	cargarUnidades(nivel: string, first?: boolean) {
		if(!first) {
			this.banderaUnidad = true;
			this.banderaPadre = true;
			this.ccosto.id_unidad_adm = '';
			this.ccosto.id_padre = '';
		} 
		
		// console.log('nivel', nivel);
		if(this.banderaCreate) {			
			this.id_nivel = nivel;
			let datos = { id_empresa: this.id_empresa, opcion: 0};		
			this.ccostoService.getUnidades(datos).subscribe((unidades: any) => {
				// console.log('unidades', unidades.data);
				if(unidades.data.length == 0) {
					this.banderaUnidad = true;
					let mensaje = { 
						message: 'Aun no se han registrado Unidades Administrativas.',
						title: 'Error'
					}
					this.mensaje.danger(mensaje);
				} else {
					if(this.banderaFirstCc) {
						if(nivel != '2') {
							let mensaje = { 
								message: 'Registre primero el centro principal.',
								title: 'Precaución'
							}
							this.mensaje.warning(mensaje);
							this.banderaUnidad = true;
						} else {
							this.banderaUnidad= false;
						}
					} else {
						this.banderaUnidad = false;
						this.unidades = unidades.data;
					}
									
				}
			});	
		} else {			 
			this.id_nivel = nivel;
			let datos = { id_empresa: this.id_empresa, opcion: 0};		
			this.ccostoService.getUnidades(datos).subscribe((unidades: any) => {
				// console.log('unidades', unidades.data);
				if(unidades.data.length == 0) {
					this.banderaUnidad = true;
					let mensaje = { 
						message: 'Aun no se han registrado Unidades Administrativas.',
						title: 'Error'
					}
					this.mensaje.danger(mensaje);
				} else {
					this.banderaUnidad = false;
					this.unidades = unidades.data;	
					this.cargarPadres();			
				}
			});	
		}		
	}
	

	cargarPadres() { 
		if(this.banderaFirstCc) {					
			this.banderaPadre = true;
		} else {
			 this.banderaPadre = false;
		}
		
		let datos = {
			empresa: this.id_empresa,
			nivel: this.id_nivel
		};
		// console.log('datos a enviar', datos);
		this.ccostoService.getCentrosPadreAdmin(datos).subscribe((centros: any) => {
			// console.log('centros', centros);
			this.centros = centros;
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
					this.ubicacion.cp = Number(numero);
					//console.log(this.ubicacion);						
			}, error => {
				// console.log('error ubicacion', error.error);
				this.mensaje.danger(error.error);
			});
		}
	}

	guardar(f: NgForm) {
		let cp = this.ubicacion.cp.toString();
		if(cp.length != 5) {
			let mensaje = { 
				message: 'El codigo Postal debe constar de 5 digitos.',
				title: 'Error'
			}
			this.mensaje.danger(mensaje);
		} else {
			/* if (f.valid) {
			this.ccostoService.createCcosto(this.ccosto)
			.subscribe((response: any) => {
				console.log(response);
			}, error => {
				console.log(error.error);
			});
		} */
		console.log(this.ccosto);
		}
		
		
	}

}

