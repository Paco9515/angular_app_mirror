import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
	providedIn: 'root'
})
export class PartidaService {

url: string;

    constructor(
        private http: HttpClient,
        private constants: ConstantsService
        ) {
            this.url = this.constants.url;
    }

    getPartidas() {
        return this.http.get(`${this.url}/get_partidas`);
    }

    activarPartida(partida: any) {
		const body = {
			id: partida.id,
			nombre: partida.nombre
		};
		return this.http.put(`${this.url}/activar_partida`, body);
	}

	createPartida(partida: any) {
		const body = {
			id: partida.id,
			codigo: partida.codigo,
			nombre: partida.nombre
		};
		if (partida.id === '') {
			return this.http.post(`${ this.url }/create_partida`, body);
		} else {
			return this.http.put(`${ this.url }/update_partida`, body);
		}
	}

	getPartida(id: string) {
		return this.http.get(`${ this.url }/get_partida/${id}`);
	}

	eliminarSector(id: string) {
		return this.http.delete(`${this.url}/delete_partida/${id}`);
	}

}