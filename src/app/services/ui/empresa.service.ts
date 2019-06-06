import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Programas } from 'src/app/interfaces/cp.interface';


@Injectable({
	providedIn: 'root'
})
export class EmpresaService {

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

	createEmpresa(programa: any) {

		// const body: Programas = programa;
		// const body = {
		// 	id: programa.id,
		// 	nombre: programa.nombre
		// };

		if (programa.id === '') {
			return this.http.post(`${this.url}/create_programa`, programa);
		} else {
			return this.http.put(`${this.url}/update_programa`, programa);
		}

	}

	getEmpresa(id: string) {
		return this.http.get(`${this.url}/get_empresa?id=${id}`);
	}

	getEmpresas() {

		return this.http.get(`${this.url}/get_empresas`);
		// return `${this.url}/get_programas`;
	}

	eliminarEmpresa(id: string) {
		return this.http.delete(`${this.url}/delete_programa/${id}`);
	}

	// activarPrograma(id: string) {
	// 	const body = {
	// 		id
	// 	};
	// 	return this.http.put(`${this.url}/activate_programa`);
	// }


}
