import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Fases } from '../../interfaces/pe.interface';

@Injectable({
	providedIn: 'root'
})
export class FaseService  {

	constructor(
		private constants: ConstantsService
	) { }

	getProyectos() {
		return this.constants.getRequest(`/get_proyectos`, 'get', false);
	}
	
	// EL PRIMER PARAMETRO CONTIENE LOS DATOS DE LA FASE
	createUpdateFase(informacion: any) {
		if (informacion.fase.id === '') {
			return this.constants.getRequest(`/create_fase`, 'post', informacion);
		} else {
			return this.constants.getRequest(`/update_fase`, 'put', informacion);
		}
	}

	getFase(id: string) {
		return this.constants.getRequest(`/get_fase/${id}`, 'get', false);
	}

	getFases(id_proyecto) {
		return this.constants.getRequest(`/get_fases/${id_proyecto}`, 'get', false);
	}

	activarEliminarFase(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_fase/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_fase/${id}`, 'delete', false);
		}
	}

	get_asentamientos_cp(cp: number) {
		return this.constants.getRequest(`/get_asentamientos_cp/${cp}`, 'get', false);
	}
}
