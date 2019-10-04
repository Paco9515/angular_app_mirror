import { Injectable } from '@angular/core';
import { Conceptos } from 'src/app/interfaces/cog.interface';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
	providedIn: 'root'
})
export class ConceptoService {

	constructor(
		private constants: ConstantsService
	) {}

	createUpdateConcepto(concepto: Conceptos) {
		if (concepto.id === '') {
			return this.constants.getRequest(`/create_concepto`, 'post', concepto);
		} else {
			return this.constants.getRequest(`/update_concepto`, 'put', concepto);
		}
	}

	getCapitulos() {
		return this.constants.getRequest(`/get_capitulos`, 'get', false);
	}

	getGastos() {
		return this.constants.getRequest(`/get_tipogastos`, 'get', false);
	}

	getConceptos() {
		return this.constants.getRequest(`/get_conceptos`, 'get', false);
	}

	getConcepto(id: string) {
		return this.constants.getRequest(`/get_concepto/${id}`, 'get', false);
	}

	activarEliminarConcepto(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_concepto/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_concepto/${id}`, 'delete', false);
		}
	}

}