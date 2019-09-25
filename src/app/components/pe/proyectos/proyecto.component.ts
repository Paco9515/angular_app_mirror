import { Component } from '@angular/core';
import { ProyectoService } from 'src/app/services/pe/proyecto.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/interfaces/pe.interface';

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
		console.log(this.proyecto);
		if (this.proyecto.cp !== '') {
			this.proyectoService.getDireccionCP(this.proyecto.cp)
				.subscribe((response: any) => {
					this.direccion = response;
					this.proyecto.colonia = '';
					// console.log(response);
				});
		}
	}

	getProyectos(id: string) {
		this.proyectoService.getProyecto(id)
			.subscribe((obj: any) => {
				this.proyecto = obj;
				this.getDireccion();
			});

	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.proyecto.entidad = this.direccion.estado;
			this.proyecto.municipio = this.direccion.municipio;
			this.proyectoService.createUpdateProyecto(this.proyecto)
				.subscribe((response: any) => {
					console.log(response);
				}, error => {
					console.log(error.error);
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
