import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';


@Injectable({
	providedIn: 'root'
})
export class SubfuenteService {

	url: string;
	// headers: HttpHeaders;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
		// this.headers = new HttpHeaders({
		// 	'Content-Type': 'application/json'
		// });
	}

	/* activarPrograma(programa: any) {
		const body = {
			id: programa.id,
			nombre: programa.nombre
		};

		return this.http.put(`${this.url}/activate_programa`, body);
	} */

	createSubfuente(programa: any) {
		const body = {
			id: programa.id,
			nombre: programa.nombre
		};

		if (programa.id === '') {
			return this.http.post(`${this.url}/create_subfuente`, body);
		} else {
			return this.http.put(`${this.url}/update_subfuente`, body);
		}

	}

	getSubfuente(id: string) {
		return this.http.get(`${this.url}/get_subfuente?id=${id}`);
	}

	getSubfuentes() {

		return this.http.get(`${this.url}/get_subfuentes`);
		// return `${this.url}/get_programas`;
	}

	eliminarSubfuente(id: string) {
		return this.http.delete(`${this.url}/delete_subfuente/${id}`);
	}

	// activarPrograma(id: string) {
	// 	const body = {
	// 		id
	// 	};
	// 	return this.http.put(`${this.url}/activate_programa`);
	// }


}
