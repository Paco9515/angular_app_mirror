import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';


@Injectable({
	providedIn: 'root'
})
export class CaService {

	constructor(
		private constants: ConstantsService
	) { }

	getSectores() {
		return this.constants.getRequest(`/get_sectores`, 'get', false);
	}

	getSector(id: string) {
		return this.constants.getRequest(`/get_sectores/${id}`, 'get', false);
	}

	getFinancieros() {
		return this.constants.getRequest(`/get_financieros`, 'get', false);
	}

	getFinanciero(id: string) {
		return this.constants.getRequest(`/get_financieros/${id}`, 'get', false);
	}

	get_financieros_sector(id: string) {
		return this.constants.getRequest(`/get_financieros_sector/${id}`, 'get', false);
	}

	getEconomias() {
		return this.constants.getRequest(`/get_economias`, 'get', false);
	}

	getEconomia(id: string) {
		return this.constants.getRequest(`/get_economias/${id}`, 'get', false);
	}

	get_economias_financiero(id: string) {
		return this.constants.getRequest(`/get_economias_financiero/${id}`, 'get', false);
	}

	getSubeconomias() {
		return this.constants.getRequest(`/get_subeconomias`, 'get', false);
	}

	getSubeconomia(id: string) {
		return this.constants.getRequest(`/get_subeconomias/${id}`, 'get', false);
	}

	get_subeconomias_economia(id: string) {
		return this.constants.getRequest(`/get_subeconomias_economia/${id}`, 'get', false);
	}

	getAdministrativas() {
		return this.constants.getRequest(`/get_economias`, 'get', false);
	}

	getAdministrativa(id: string) {
		return this.constants.getRequest(`/get_economias/${id}`, 'get', false);
	}

	get_administrativas_subeconomia(id: string) {
		return this.constants.getRequest(`/get_administrativas_subeconomica/${id}`, 'get', false);
	}

}
