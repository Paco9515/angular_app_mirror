import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Fases } from '../../interfaces/pe.interface';

@Injectable({
	providedIn: 'root'
})
export class FaseService {

	constructor(
		private constants: ConstantsService
	) { }

	getProyectos() {
		return this.constants.getRequest(`/get_proyectos`, 'get', false);
	}

	createUpdateFase(fase: Fases) {
		if (fase.id === '') {
			return this.constants.getRequest(`/create_fase`, 'post', fase);
		} else {
			return this.constants.getRequest(`/update_fase`, 'put', fase);
		}
	}

	getFase(id: string) {
		return this.constants.getRequest(`/get_fase/${id}`, 'get', false);
	}

	getFases() {
		return this.constants.getRequest(`/get_fases`, 'get', false);
	}

	activarEliminarFase(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_fase/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_fase/${id}`, 'delete', false);
		}
	}
}
