import { Component } from '@angular/core';
import { ProyectoService } from 'src/app/services/pe/proyecto.service';
import { Proyectos } from 'src/app/interfaces/pe.interface';
import { MensajesService } from './../../../services/shared/mensajes.service';

@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html'
})
export class ProyectosComponent {

	detalle: Proyectos;
	proyectos: Proyectos[];

	constructor(
		private proyecto_service: ProyectoService,
		private mensaje: MensajesService
	) {

		this.detalle = {
			id_empresa: '',
			codigo: '',
			nombre: '',
			descripcion: '',
			anio: '',
			cp: '',
			entidad: '',
			municipio: '',
			colonia: '',
			status: true
		};

		this.proyectos = [];
		this.getProyectos();
	}

	getProyectos() {
		this.proyecto_service.getProyectos()
			.subscribe((data: any) => this.proyectos = data);
	}

	eliminarActivar(id: string, type: boolean) {
		this.proyecto_service.activarEliminarProyecto(id, type)
			.subscribe((data: any) => {
				this.getProyectos();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}
}
