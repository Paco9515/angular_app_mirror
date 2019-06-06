import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';


@Injectable({
	providedIn: 'root'
})
export class SubfuncionService {

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

	createSubfuncion(programa: any) {
		const body = {
			id: programa.id,
			nombre: programa.nombre
		};

		if (programa.id === '') {
			return this.http.post(`${this.url}/create_subfuncion`, body);
		} else {
			return this.http.put(`${this.url}/update_subfuncion`, body);
		}

	}

	getSubfuncion(id: string) {
		return this.http.get(`${this.url}/get_subfuncion?id=${id}`);
	}

	getSubfunciones() {

		return this.http.get(`${this.url}/get_subfunciones`);
		// return `${this.url}/get_programas`;
	}

	eliminarSubfuncion(id: string) {
		return this.http.delete(`${this.url}/delete_subfuncion/${id}`);
	}

	// activarPrograma(id: string) {
	// 	const body = {
	// 		id
	// 	};
	// 	return this.http.put(`${this.url}/activate_programa`);
	// }


}
