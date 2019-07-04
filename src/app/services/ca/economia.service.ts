import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Economias } from 'src/app/interfaces/ca.interface';

@Injectable({
  providedIn: 'root'
})
export class EconomiaService {

	constructor(
		private constants: ConstantsService
	) {}

	createUpdateEconomia(economia: Economias) {
		if (economia.id === '') {
			return this.constants.getRequest(`/create_economia`, 'post', economia);
		} else {
			return this.constants.getRequest(`/update_economia`, 'put', economia);
		}
	}

	activarEliminarEconomia(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_economia/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_economia/${id}`, 'delete', false);
		}
	}

	getEconomias() {
		return this.constants.getRequest(`/get_economias`, 'get', false);
	}

	getEconomia(id: string) {
		return this.constants.getRequest(`/get_economias/${id}`, 'get', false);
	}

	getFinancieros() {
		return this.constants.getRequest(`/get_financieros`, 'get', false);
	}

	getSectores() {
		return this.constants.getRequest(`/get_sectores`, 'get', false);
	}
}
