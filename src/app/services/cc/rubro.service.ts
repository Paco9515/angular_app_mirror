import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  url: string;

	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	getRubros() {
		return this.http.get(`${ this.url }/get_rubros`);
	}

	activarRubro(rubro: any) {
		const body = {
			id: rubro.id,
			nombre: rubro.nombre
		};
		return this.http.put(`${this.url}/activar_rubro`, body);
	}

	createRubro(rubro: any) {
		const body = {
			id: rubro.id,
			codigo: rubro.codigo,
			nombre: rubro.nombre
		};
		if (rubro.id === '') {
			return this.http.post(`${ this.url }/create_rubro`, body);
		} else {
			return this.http.put(`${ this.url }/update_rubro`, body);
		}
	}

	getRubro(id: string) {
		return this.http.get(`${ this.url }/get_rubro/${id}`);
	}

	eliminarRubro(id: string) {
		return this.http.delete(`${this.url}/delete_rubro/${id}`);
	}
}
