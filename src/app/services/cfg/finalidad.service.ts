import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';


@Injectable({
	providedIn: 'root'
})
export class FinalidadService {

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

	createFinalidad(programa: any) {
		const body = {
			id: programa.id,
			nombre: programa.nombre
		};

		if (programa.id === '') {
			return this.http.post(`${this.url}/create_finalidad`, body);
		} else {
			return this.http.put(`${this.url}/update_finalidad`, body);
		}

	}

	getFinalidad(id: string) {
		return this.http.get(`${this.url}/get_finalidad?id=${id}`);
	}

	getFinalidades() {

		return this.http.get(`${this.url}/get_finalidades`);
		// return `${this.url}/get_programas`;
	}

	eliminarFinalidad(id: string) {
		return this.http.delete(`${this.url}/delete_finalidad/${id}`);
	}

	// activarPrograma(id: string) {
	// 	const body = {
	// 		id
	// 	};
	// 	return this.http.put(`${this.url}/activate_programa`);
	// }


}
