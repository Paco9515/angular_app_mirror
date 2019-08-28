import { Component } from '@angular/core';
import { ProyectoService } from 'src/app/services/pe/proyecto.service';
import { Proyectos } from 'src/app/interfaces/pe.interface';

@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html'
})
export class ProyectosComponent {

	proyectos: Proyectos[];

	constructor(
		private proyecto_service: ProyectoService
	) {
		this.proyectos = [];
		this.getProyectos();
	}

	getProyectos() {
		this.proyecto_service.getProyectos()
			.subscribe((data: any) => this.proyectos = data);
	}

	eliminarActivar(id: string, type: boolean) {
		this.proyecto_service.activarEliminarProyecto(id, type)
			.subscribe((response: any) => {
				console.log(response.message);
				this.getProyectos();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
	}
}
