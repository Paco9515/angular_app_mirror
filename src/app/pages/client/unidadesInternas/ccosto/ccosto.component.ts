import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { Ccosto } from 'src/app/common/interfaces/ui.interface';
// import { EmpresaService } from 'src/app/common/services/ui/empresa.service';
// import { UnidadesAdminService } from 'src/app/common/services/ui/unidadesAdmin.service';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { UsuariosService } from '../../../../common/services/usuario/usuarios.service';

@Component({
  selector: 'app-ccosto',
  templateUrl: './ccosto.component.html',
  styles: []
})
export class CcostoComponent {

	id: string;
	usuario: any;
	usuarios: any;
	ccosto: Ccosto;
	unidades: any;
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
	// banderaOficina: boolean;
	banderaMostrarSelectResp: boolean;
	disUnidad: boolean;
	hayUsers: boolean;

	constructor(
		private ccostoService: CcostoService,
		private usuarioService: UsuariosService,
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
			oficina_unidad: false,
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


		this.unidades = ''
		this.subs = '';
		this.id_nivel = '';
		this.id_empresa = '';
		this.id_cc = '';
		this.nivel = '';
		this.banderaTipo = 'admin';
		this.banderaDigitos = false;
		this.hayUsers = false;


		let usuario = JSON.parse(localStorage.getItem('currentUser'));
		this.usuario = usuario;
		// console.log(usuario);
		this.id_cc = usuario.id_cc;

		if(usuario.id_nivel == 1) {
			this.ccosto.oficina_unidad = true;
			this.banderaMostrarSelectResp = true;
		} else {
			this.banderaMostrarSelectResp = false;
		}

		this.activatedRoute.params.subscribe((data: any) => {
			// console.log('params', data);

			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.banderaCreate = false;
				this.ccostoService.getCcosto(this.id).subscribe((obj: any) => {
					// console.log('ccsoto', obj.data);
					this.ccosto = obj.data;
					// console.log('id_area', this.ccosto.id_area);
					this.ccostoService.getUbicacion(this.ccosto.id_ubicacion_geografica).subscribe((ubicacion: any) => {
						console.log('ubicacion', ubicacion);
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

		let info = {
			'id_cc_seleccionado': this.id,
			'id_cc_seleccionador': this.id_cc
		};
		// console.log('info', info);
		this.ccostoService.getUnidadesCcClient(info).subscribe((unidad: any) => {
			// console.log('unidades', unidad);
			this.unidades = unidad;
			if(unidad.length < 2 && this.id !== 'nuevo') {
				this.disUnidad = true;
				let mensaje = {
					'title': 'Precaución',
					'message': 'No hay unidades disponibles para seleccionar.'
				};
				this.mensaje.warning(mensaje);
			} else {
				this.disUnidad = false;
			}

		});

		this.ccostoService.getSubfunciones().subscribe((subs: any) => {
			// console.log('subs', subs);
			this.subs = subs;
		});

		this.cargarUsuarios();
	}

	cargarUsuarios() {
		let datos = {
			id_cc_modificador: this.usuario.id,
			id_cc_a_modificar: this.id
		};

		this.usuarioService.getUsersDisponiblesByEmpresa(datos).subscribe((users: any) => {

			/**Editar usuarios */
			if(users.length < 2 && this.id !== 'nuevo') {

				this.hayUsers = true;
				this.usuarios = users;
				let mensaje = {
					'title': 'Precaución',
					'message': 'No hay usuarios disponibles para seleccionar.'
				};
				this.mensaje.warning(mensaje);
				// console.log(users);
			}

			this.hayUsers = false;
			this.usuarios = users;

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
				if(this.ccosto.num_interior == '') {
					this.ccosto.num_interior = 'S/N';
				}
				if(this.ccosto.longitud == '') {
					this.ccosto.longitud = null;
				}
				if(this.ccosto.latitud == '') {
					this.ccosto.latitud = null;
				}
				if(this.usuario.id_nivel == 2) {
					this.ccosto.oficina_unidad = true;
				}
				// console.log(this.ccosto);
				this.ccostoService.createCcosto(this.ccosto)
				.subscribe((response: any) => {
					// console.log(response);
					return this.mensaje.success(response, 'panel-adm/ccostos');
				}, error => {
					// console.log(error.error);
					return this.mensaje.danger(error.error);
				});
			}
		}


	}

}

