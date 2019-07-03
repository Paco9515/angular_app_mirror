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
			return this.constants.getRequest(`/activate_subeconomia/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_subeconomia/${id}`, 'delete', false);
		}
	}

	getSubeconomias() {
		return this.constants.getRequest(`/get_subeconomias`, 'get', false);
	}

	getSubeconomia(id: string) {
		return this.constants.getRequest(`/get_subeconomias/${id}`, 'get', false);
	}

	getEconomias() {
		return this.constants.getRequest(`/get_economias`, 'get', false);
	}

	getFinancieros() {
		return this.constants.getRequest(`/get_financieros`, 'get', false);
	}

	getSectores() {
		return this.constants.getRequest(`/get_sectores`, 'get', false);
	}

}
