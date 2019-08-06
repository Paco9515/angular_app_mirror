import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Rubros } from 'src/app/interfaces/cc.interface';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

	constructor(
		private constants: ConstantsService
	) {	}

	createUpdateRubro(rubro: Rubros) {

		if (rubro.id === '') {
			return this.constants.getRequest(`/create_rubro`, 'post', rubro);
		} else {
			return this.constants.getRequest(`/update_rubro`, 'put', rubro);
		}
	}

	activarEliminarRubro(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_rubro/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_rubro/${id}`, 'delete', false);
		}
	}

	getGruposGenero(id) {
		return this.constants.getRequest(`/get_grupos_genero/${id}`, 'get', false);
	}

	getRubrosGrupo(id) {
		return this.constants.getRequest(`/get_rubros_grupo/${id}`, 'get', false);
	}

	getGeneros() {
		return this.constants.getRequest(`/get_generos`, 'get', false);
	}

	getRubros() {
		return this.constants.getRequest(`/get_rubros`, 'get', false);
	}

	getRubro(id: string) {
		return this.constants.getRequest(`/get_rubro/${id}`, 'get', false);
	}

}
