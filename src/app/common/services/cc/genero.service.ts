import { Injectable } from '@angular/core';
import { Generos } from 'src/app/common/interfaces/cc.interface';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

	url: string;

	constructor(
		private constants: ConstantsService
		) {
	}

	 getGeneros() {
		return this.constants.getRequest(`/get_generos`, 'get', false);
	}

	createUpdateGenero(genero: Generos) {

		if (genero.id === '') {
			return this.constants.getRequest(`/create_genero`, 'post', genero);
		} else {
			return this.constants.getRequest(`/update_genero`, 'put', genero);
		}
	}

	activarEliminarGenero(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_genero/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_genero/${id}`, 'delete', false);
		}
	}

	getGenero(id: string) {
		return this.constants.getRequest(`/get_genero/${id}`, 'get', false);
	}
}
