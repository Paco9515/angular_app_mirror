import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
	providedIn: 'root'
})
export class CogService {

	constructor(
		private constants: ConstantsService
	) { }

	getCapitulos() {
		return this.constants.getRequest(`/get_capitulos`, 'get', false);
	}

	getCapitulo(id: string) {
		return this.constants.getRequest(`/get_capitulo/${id}`, 'get', false);
	}

	getConceptos() {
		return this.constants.getRequest(`/get_conceptos`, 'get', false);
	}

	getConcepto(id: string) {
		return this.constants.getRequest(`/get_concepto/${id}`, 'get', false);
	}

	get_conceptos_capitulo(id: string) {
		return this.constants.getRequest(`/get_conceptos_capitulo/${id}`, 'get', false);
	}

	getPartidas() {
		return this.constants.getRequest(`/get_partidas`, 'get', false);
	}

	getPartida(id: string) {
		return this.constants.getRequest(`/get_partida/${id}`, 'get', false);
	}

	get_partidas_concepto(id: string) {
		return this.constants.getRequest(`/get_partidas_concepto/${id}`, 'get', false);
	}

}