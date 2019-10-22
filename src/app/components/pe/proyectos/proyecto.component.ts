import { Component } from '@angular/core';
import { ProyectoService } from 'src/app/services/pe/proyecto.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/interfaces/pe.interface';
import { MensajesService } from './../../../services/shared/mensajes.service';

@Component({
	selector: 'app-proyecto',
	templateUrl: './proyecto.component.html'
})

export class ProyectoComponent {
	proyecto: Proyectos;
	direccion: any;
	colonia: any;
	constructor(
		private proyectoService: ProyectoService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService
	) {

		this.colonia = '';

		this.direccion = {
			codigo_postal: '',
			municipio: '',
			estado: '',
			colonias: []
		};

		this.proyecto = {
			id: '',
			id_empresa: '1',
			codigo: '',
			nombre: '',
			descripcion: '',
			anio: '2019',
			cp: '',
			entidad: '',
			municipio: '',
			colonia: '',
			status: false
		};

		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.getProyectos(data.id);
			}
		});
	}

	getDireccion() {
		if (this.proyecto.cp !== '') {
			this.proyectoService.getDireccionCP(this.proyecto.cp)
				.subscribe((response: any) => {
					if (response.colonias !== [] && response.municipio !== ''  && response.estado !== '' ) {

						this.direccion = response;
						this.proyecto.colonia = '';

					} else {
						const MENSAJE: any = {
							'message': 'El codigo postal no es valido',
							'title': 'Advertencia'
						};
						this.mensaje.warning(MENSAJE);
					}
				});
		}
	}

	getProyectos(id: string) {
		this.proyectoService.getProyecto(id)
			.subscribe((data: any) => {
				console.log(data)
				this.proyecto = data.data;
				this.getDireccion();
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.proyecto.entidad = this.direccion.estado;
			this.proyecto.municipio = this.direccion.municipio;
			this.proyectoService.createUpdateProyecto(this.proyecto)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});

			this.proyecto = {
				id: '',
				id_empresa: '1',
				codigo: '',
				nombre: '',
				descripcion: '',
				anio: '2019',
				cp: '',
				entidad: '',
				municipio: '',
				colonia: '',
				status: false
			};
			this.direccion = {
				codigo_postal: '',
				municipio: '',
				estado: '',
				colonias: []
			};
		}
	}
}
