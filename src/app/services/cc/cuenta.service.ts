import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Cuentas } from 'src/app/interfaces/cc.interface';
@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(
	private constants: ConstantsService
	) {}

	createUpdateCuenta(cuneta: Cuentas) {
		if (cuneta.id === '') {
			return this.constants.getRequest(`/create_cuenta`, 'post', cuneta);
		} else {
			return this.constants.getRequest(`/update_cuenta`, 'put', cuneta);
		}
	}

	activarEliminarCuenta(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_cuenta/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_cuenta/${id}`, 'delete', false);
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

	getCuenta(id: string) {
		return this.constants.getRequest(`/get_cuenta/${id}`, 'get', false);
	}
}
