import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Subprograma } from 'src/app/common/interfaces/cp.interface';

@Injectable({
	providedIn: 'root'
})
export class SubprogramaService {

	constructor(
		private constants: ConstantsService
	) { }

	createUpdateSubprograma(subprograma: Subprograma) {

		if (subprograma.id === '') {
			return this.constants.getRequest(`/create_subprograma`, 'post', subprograma);
		} else {
			return this.constants.getRequest(`/update_subprograma`, 'put', subprograma);
		}

	}

	get_gastos() {
		return this.constants.getRequest(`/get_tipogastos`, 'get', false);
	}

	getProgramas() {
		return this.constants.getRequest(`/get_programas`, 'get', false);
	}

	getSubprograma(id: string) {
		return this.constants.getRequest(`/get_subprograma/${id}`, 'get', false);
	}

	getSubprogramas() {
		return this.constants.getRequest(`/get_subprogramas`, 'get', false);
	}

	getSubprogramaPRograma(id: string) {
		return this.constants.getRequest(`/get_subprogramas_programa/${id}`, 'get', false);
	}

	activarEliminarSubprograma(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_subprograma/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_subprograma/${id}`, 'delete', false);
		}
	}

}
