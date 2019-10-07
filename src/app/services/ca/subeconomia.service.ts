import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Subeconomias } from 'src/app/interfaces/ca.interface';

@Injectable({
  providedIn: 'root'
})
export class SubeconomiaService {

	constructor(
		private constants: ConstantsService
	) {}

	createUpdateSubeconomia(subeconomia: Subeconomias) {
		if (subeconomia.id === '') {
			return this.constants.getRequest(`/create_subeconomia`, 'post', subeconomia);
		} else {
			return this.constants.getRequest(`/update_subeconomia`, 'put', subeconomia);
		}
	}

	activarEliminarSubeconomia(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_subeconomia/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_subeconomia/${id}`, 'delete', false);
		}
	}

	getSubeconomias() {
		return this.constants.getRequest(`/get_subeconomias`, 'get', false);
	}

	getSubeconomia(id: string) {
		return this.constants.getRequest(`/get_subeconomia/${id}`, 'get', false);
	}

	getEconomiasFinanciero(id) {
		return this.constants.getRequest(`/get_economias_financiero/${id}`, 'get', false);
	}

	getFinancierosSector(id) {
		return this.constants.getRequest(`/get_financieros_sector/${id}`, 'get', false);
	}

	getSectores() {
		return this.constants.getRequest(`/get_sectores`, 'get', false);
	}

}
