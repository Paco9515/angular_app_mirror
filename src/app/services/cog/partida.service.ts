import { Injectable } from '@angular/core';
import { Partidas } from 'src/app/interfaces/cog.interface';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
	providedIn: 'root'
})
export class PartidaService {

	constructor(
		private constants: ConstantsService
		) { }

	createUpdatePartida(partida: Partidas) {

		if (partida.id === '') {
			return this.constants.getRequest(`/create_partida`, 'post', partida);
		} else {
			return this.constants.getRequest(`/update_partida`, 'put', partida);
		}
	}
	activarEliminarPartida(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_partida/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_partida/${id}`, 'delete', false);
		}
	}

	getCapitulos() {
		return this.constants.getRequest(`/get_capitulos`, 'get', false);
	}

	getConceptos() {
		return this.constants.getRequest(`/get_conceptos`, 'get', false);
	}

	getPartidas() {
		return this.constants.getRequest(`/get_partidas`, 'get', false);
	}

	getPartida(id: string) {
		return this.constants.getRequest(`/get_partida/${id}`, 'get', false);
	}
}