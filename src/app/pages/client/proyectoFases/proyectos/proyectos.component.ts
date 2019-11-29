import { Component } from '@angular/core';
import { ProyectoService } from 'src/app/common/services/pe/proyecto.service';
import { Proyectos } from 'src/app/common/interfaces/pe.interface';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';

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
			id: '',
			id_centro_costo: '',
			id_subprograma: '',
			codigo: '',
			nombre: '',
			descripcion: '',
			anio: null,
			fecha_inicio: null,
			fecha_final: null,
			codigo_subprograma: '',
	        nombre_subprograma: '',
	        codigo_programa: '',
	        nombre_programa: '',
	        codigo_centro_costo: '',
			nombre_centro_costo: '',
			codigo_unidad_admin: '',
			nombre_unidad_admin: '',
			status: false
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
