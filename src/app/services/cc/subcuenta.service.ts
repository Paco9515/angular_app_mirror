import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Subcuentas } from 'src/app/interfaces/cc.interface';

@Injectable({
  providedIn: 'root'
})
export class SubcuentaService {

	constructor(
		private constants: ConstantsService
	) {}

	createUpdateSubcuenta(subcuenta: Subcuentas) {
		if (subcuenta.id === '') {
			return this.constants.getRequest(`/create_subcuenta`, 'post', subcuenta);
		} else {
			return this.constants.getRequest(`/update_subcuenta`, 'put', subcuenta);
		}
	}

	activarEliminarSubcuenta(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_subcuenta/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_subcuenta/${id}`, 'delete', false);
		}
	}

	getGeneros() {
		return this.constants.getRequest(`/get_generos`, 'get', false);
	}

	getGrupos() {
		return this.constants.getRequest(`/get_grupos`, 'get', false);
	}

	getRubros() {
		return this.constants.getRequest(`/get_rubros`, 'get', false);
	}

	getCuentas() {
		return this.constants.getRequest(`/get_cuentas`, 'get', false);
	}

	getSubcuentas() {
		return this.constants.getRequest(`/get_subcuentas`, 'get', false);
	}

	getSubcuenta(id: string) {
		return this.constants.getRequest(`/get_subcuenta/${id}`, 'get', false);
	}
}
