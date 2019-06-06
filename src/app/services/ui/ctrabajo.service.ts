import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Ctrabajo } from '../../interfaces/ui.interface';


@Injectable({
	providedIn: 'root'
})
export class CtrabajoService {

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

	createCtrabajo(ctrabajo: Ctrabajo) {
		
		if (ctrabajo.id === '') {
			return this.http.post(`${this.url}/create_ctrabajo`, ctrabajo);
		} else {
			return this.http.put(`${this.url}/update_ctrabajo`, ctrabajo);
		}

	}

	getCtrabajo(id: string) {
		return this.http.get(`${this.url}/get_ctrabajo/${id}`);
	}

	getCtrabajos() {
		return this.http.get(`${this.url}/get_ctrabajos`);
	}

	getCentros() {
		return this.http.get(`${this.url}/get_ccostos`);
	}

	eliminarCtrabajo(id: string) {
		return this.http.delete(`${this.url}/delete_ctrabajo/${id}`);
	}

	// activarPrograma(id: string) {
	// 	const body = {
	// 		id
	// 	};
	// 	return this.http.put(`${this.url}/activate_programa`);
	// }


}
