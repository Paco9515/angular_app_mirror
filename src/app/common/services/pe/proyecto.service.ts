import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Proyectos } from '../../interfaces/pe.interface';

@Injectable({
	providedIn: 'root'
})
export class ProyectoService {

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

	// ** fUNCION QUE GUARDA UN HISTORIAL DE PROYECTOS **
	createUpdateProyecto2(proyecto: Proyectos, proyectoHistorial: any) {
		if (proyecto.id === '') {
		} else {
			return this.constants.getRequest(`/create_proyecto_historial`, 'post', proyectoHistorial);
		}
	}

	getProyecto(id: string) {
		return this.constants.getRequest(`/get_proyecto/${id}`, 'get', false);
	}

	// ** trae el ultimo proyecto para guardarlo en el historial**
	getUltimoProyecto() {
		return this.constants.getRequest(`/get_ultimo_proyecto/`, 'get', false);
	}

	getProyectos(id_presupuesto: string) {
		return this.constants.getRequest(`/get_proyectos/${id_presupuesto}`, 'get', false);
	}

	activarEliminarProyecto(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_proyecto/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_proyecto/${id}`, 'delete', false);
		}
	}
}
