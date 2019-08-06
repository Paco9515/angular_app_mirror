import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';


@Injectable({
	providedIn: 'root'
})
export class CcService {

  constructor(
	private constants: ConstantsService
	) { }

	getGeneros() {
		return this.constants.getRequest(`/get_generos`, 'get', false);
	}

	getGenero(id: string) {
		return this.constants.getRequest(`/get_genero/${id}`, 'get', false);
	}

	get_grupos() {
		return this.constants.getRequest(`/get_grupos`, 'get', false);
	}

	get_grupo(id: string) {
		return this.constants.getRequest(`/get_grupo/${id}`, 'get', false);
	}

	get_grupos_genero(id: string) {
		return this.constants.getRequest(`/get_grupos_genero/${id}`, 'get', false);
	}

	get_rubros() {
		return this.constants.getRequest(`/get_rubros`, 'get', false);
	}

	get_rubro(id: string) {
		return this.constants.getRequest(`/get_rubro/${id}`, 'get', false);
	}

	get_rubros_grupo(id: string) {
		return this.constants.getRequest(`/get_rubros_grupo/${id}`, 'get', false);
	}

	get_cuentas() {
		return this.constants.getRequest(`/get_cuentas`, 'get', false);
	}

	get_cuenta(id: string) {
		return this.constants.getRequest(`/get_cuenta/${id}`, 'get', false);
	}

	get_cuentas_rubro(id: string) {
		return this.constants.getRequest(`/get_cuentas_rubro/${id}`, 'get', false);
	}

	get_subcuentas() {
		return this.constants.getRequest(`/get_subcuentas`, 'get', false);
	}

	get_subcuenta(id: string) {
		return this.constants.getRequest(`/get_subcuenta/${id}`, 'get', false);
	}

	get_subcuentas_cuenta(id: string) {
		return this.constants.getRequest(`/get_subcuentas_cuenta/${id}`, 'get', false);
	}

}
