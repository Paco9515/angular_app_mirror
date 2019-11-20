import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Capitulos } from 'src/app/common/interfaces/cog.interface';

@Injectable({
	providedIn: 'root'
})
export class CapituloService {

	constructor(
		private constants: ConstantsService
	) {}


	createUpdateCapitulo(capitulo: Capitulos) {
		if (capitulo.id === '') {
			return this.constants.getRequest(`/create_capitulo`, 'post', capitulo);
		} else {
			return this.constants.getRequest(`/update_capitulo`, 'put', capitulo);
		}
	}

	getCapitulos() {
		return this.constants.getRequest(`/get_capitulos`, 'get', false);
	}

	getCapitulo(id: string) {
		return this.constants.getRequest(`/get_capitulo/${id}`, 'get', false);
	}

	activarEliminarCapitulo(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_capitulo/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_capitulo/${id}`, 'delete', false);
		}
	}

}