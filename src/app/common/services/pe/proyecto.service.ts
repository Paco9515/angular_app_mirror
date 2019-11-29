import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Proyectos } from '../../interfaces/pe.interface';


@Injectable({
	providedIn: 'root'
})
export class ProyectoService {


	// data: any;

	constructor(
		private constants: ConstantsService
	) { }

	createUpdateProyecto(proyecto: Proyectos) {

		if (proyecto.id === '') {
			return this.constants.getRequest(`/create_proyecto`, 'post', proyecto);
		} else {
			return this.constants.getRequest(`/update_proyecto`, 'put', proyecto);
		}

	}

	getProyecto(id: string) {
		return this.constants.getRequest(`/get_proyecto/${id}`, 'get', false);
	}

	getProyectos() {
		return this.constants.getRequest(`/get_proyectos`, 'get', false);
	}

	activarEliminarProyecto(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_proyecto/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_proyecto/${id}`, 'delete', false);
		}
	}
}
