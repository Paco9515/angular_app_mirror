import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Programas } from '../../interfaces/cp.interface';


@Injectable({
	providedIn: 'root'
})
export class ProgramaService {

	constructor(
		private constants: ConstantsService
	) { }

	createUpdatePrograma(programa: Programas) {

		if (programa.id === '') {
			return this.constants.getRequest(`/create_programa`, 'post', programa);
		} else {
			return this.constants.getRequest(`/update_programa`, 'put', programa);
		}

	}

	getPrograma(id: string) {
		return this.constants.getRequest(`/get_programa/${id}`, 'get', false);
	}

	getProgramas() {
		return this.constants.getRequest(`/get_programas`, 'get', false);
	}

	activarEliminarPrograma(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_programa/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_programa/${id}`, 'delete', false);
		}
	}
}
