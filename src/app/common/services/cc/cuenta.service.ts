import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Cuentas } from 'src/app/common/interfaces/cc.interface';
@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(
	private constants: ConstantsService
	) {}

	createUpdateCuenta(cuenta: Cuentas) {
		if (cuenta.id === '') {
			return this.constants.getRequest(`/create_cuenta`, 'post', cuenta);
		} else {
			return this.constants.getRequest(`/update_cuenta`, 'put', cuenta);
		}
	}

	activarEliminarCuenta(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_cuenta/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_cuenta/${id}`, 'delete', false);
		}
	}

	getGeneros() {
		return this.constants.getRequest(`/get_generos`, 'get', false);
	}

	getGruposGenero(id) {
		return this.constants.getRequest(`/get_grupos_genero/${id}`, 'get', false);
	}

	getRubrosGrupo(id) {
		return this.constants.getRequest(`/get_rubros_grupo/${id}`, 'get', false);
	}

	getCuentas() {
		return this.constants.getRequest(`/get_cuentas`, 'get', false);
	}

	getCuenta(id: string) {
		return this.constants.getRequest(`/get_cuenta/${id}`, 'get', false);
	}
}
