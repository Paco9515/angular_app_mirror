import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

	url: string;

	constructor(
			private http: HttpClient,
			private constants: ConstantsService
		) {

		this.url = this.constants.url;

	}

	 getGeneros() {
		return this.http.get(`${ this.url }/get_generos`);
	}

	activarGenero(sector: any) {
		const body = {
			id: sector.id,
			nombre: sector.nombre
		};
		return this.http.put(`${this.url}/activar_genero`, body);
	}

	createGenero(sector: any) {
		const body = {
			id: sector.id,
			codigo: sector.codigo,
			nombre: sector.nombre
		};
		if (sector.id === '') {
			return this.http.post(`${ this.url }/create_genero`, body);
		} else {
			return this.http.put(`${ this.url }/update_genero`, body);
		}
	}

	getGenero(id: string) {
		return this.http.get(`${ this.url }/get_genero/${id}`);
	}

	eliminarGenero(id: string) {
		return this.http.delete(`${this.url}/delete_genero/${id}`);
	}

}
