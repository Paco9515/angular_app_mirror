import { Injectable } from '@angular/core';
import { Financieros } from 'src/app/interfaces/ca.interface';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class FinancieroService {

  	constructor(
		private constants: ConstantsService
	) {}

	createUpdateFinanciero(financiero: Financieros) {
		if (financiero.id === '') {
			return this.constants.getRequest(`/create_financiero`, 'post', financiero);
		} else {
			return this.constants.getRequest(`/update_financiero`, 'put', financiero);
		}
	}

	activarEliminarFinanciero(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_financiero/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_financiero/${id}`, 'delete', false);
		}
	}

	getFinancieros() {
		return this.constants.getRequest(`/get_financieros`, 'get', false);
	}

	getFinanciero(id: string) {
		return this.constants.getRequest(`/get_financieros/${id}`, 'get', false);
	}

	getSectores() {
		return this.constants.getRequest(`/get_sectores`, 'get', false);
	}

}
