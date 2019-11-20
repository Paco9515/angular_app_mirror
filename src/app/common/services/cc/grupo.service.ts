import { Injectable } from '@angular/core';
import { Grupos } from 'src/app/common/interfaces/cc.interface';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

	url: string;

	constructor(
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	createUpdateGrupo(grupo: Grupos) {

		if (grupo.id === '') {
			return this.constants.getRequest(`/create_grupo`, 'post', grupo);
		} else {
			return this.constants.getRequest(`/update_grupo`, 'put', grupo);
		}
	}
	activarEliminarGrupo(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_grupo/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_grupo/${id}`, 'delete', false);
		}
	}

	getGeneros() {
		return this.constants.getRequest(`/get_generos`, 'get', false);
	}

	getGrupos() {
		return this.constants.getRequest(`/get_grupos`, 'get', false);
	}

	getGrupo(id: string) {
		return this.constants.getRequest(`/get_grupo/${id}`, 'get', false);
	}
}
