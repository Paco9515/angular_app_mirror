import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../constants.service';

@Injectable({
	providedIn: 'root'
})
export class CapituloService {
    url: string;

	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
        this.url = this.constants.url;
	}

	getCapitulos() {
		return this.http.get(`${ this.url }/get_capitulos`);
	}

	createCapitulo(capitulo: any) {
		const body = {
			id: capitulo.id,
			codigo: capitulo.codigo,
			nombre: capitulo.nombre
        };
		if ( capitulo.id === '' ) {
			return this.http.post(`${ this.url }/create_capitulo`, body);
		} else {
			return this.http.put(`${ this.url }/update_capitulo`, body);
		}
	}

	getCapitulo(id: string) {
		return this.http.get(`${ this.url }/get_capitulo/${ id }`);
	}

	deleteCapitulo(id: string) {
		return this.http.delete(`${ this.url }/delete_capitulo/${id}`);
	}

	activarCapitulo(capitulo: any) {
		const body = {
			id: capitulo.id,
			nombre: capitulo.nombre
		};
		return this.http.put(`${ this.url }/activarte_capitulo`, body);
	}

}