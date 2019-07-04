import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Clas_admin } from 'src/app/interfaces/ca.interface';

@Injectable({
  providedIn: 'root'
})
export class ClasAdministrativaService {

	constructor(
		private constants: ConstantsService
	) {}

	 createUpdateClasAdmin(admin: Clas_admin) {
		if (admin.id === '') {
			return this.constants.getRequest(`/create_administrativa`, 'post', admin);
		} else {
			return this.constants.getRequest(`/update_administrativa`, 'put', admin);
		}
	}

	activarEliminarClasAdmin(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_administrativa/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_administrativa/${id}`, 'delete', false);
		}
	}

	getClasAdmins() {
		return this.constants.getRequest(`/get_administrativas`, 'get', false);
	}

	getClasAdmin(id: string) {
		return this.constants.getRequest(`/get_administrativas/${id}`, 'get', false);
	}

	getSubeconimias() {
		return this.constants.getRequest(`/get_subeconomias`, 'get', false);
	}

	getEconimias() {
		return this.constants.getRequest(`/get_economias`, 'get', false);
	}

	getFinancieros() {
		return this.constants.getRequest(`/get_financieros`, 'get', false);
	}

	getSectores() {
		return this.constants.getRequest(`/get_sectores`, 'get', false);
	}
}
