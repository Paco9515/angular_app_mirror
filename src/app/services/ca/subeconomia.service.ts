import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class SubeconomiaService {

	url: string;

	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	getSubeconomias() {
		return this.http.get(`${ this.url }/get_subeconomias`);
	}

	activarSubeconomia(subeconomia: any) {
		const body = {
			id: subeconomia.id,
			nombre: subeconomia.nombre
		};
		return this.http.put(`${this.url}/activar_subeconomia`, body);
	}

	createSubeconomia(subeconomia: any) {
		const body = {
			id: subeconomia.id,
			codigo: subeconomia.codigo,
			nombre: subeconomia.nombre
		};
		if (subeconomia.id === '') {
			return this.http.post(`${ this.url }/create_subeconomia`, body);
		} else {
			return this.http.put(`${ this.url }/update_subeconomia`, body);
		}
	}

	getSubeconomia(id: string) {
		return this.http.get(`${ this.url }/get_subeconomia/${id}`);
	}

	eliminarSubeconomia(id: string) {
		return this.http.delete(`${this.url}/delete_subeconomia/${id}`);
	}
}
