import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { UnidadesAdmin } from '../../interfaces/ui.interface';


@Injectable({
	providedIn: 'root'
})
export class UnidadesAdminService {

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

	createUnidad(unidad: UnidadesAdmin) {

		
		console.log('servicio', unidad);

		if (unidad.id === '') {
			return this.http.post(`${this.url}/create_unidad`, unidad);
		} else {
			return this.http.put(`${this.url}/update_unidad`, unidad);
		}

	}

	getUnidadAdmin(id: string) {
		return this.http.get(`${this.url}/get_unidad/${id}`);
	}

	getUnidadesAdmin() {
		return this.http.get(`${this.url}/get_unidades`);
		// return `${this.url}/get_programas`;
	}

	getEmpresas() {
		//console.log('id para traer las empresas',id);
		return this.http.get(`${this.url}/get_empresas`);
		// return `${this.url}/get_programas`;
	}

	eliminarUnidad(id: string) {
		return this.http.delete(`${this.url}/delete_programa/${id}`);
	}

	// activarPrograma(id: string) {
	// 	const body = {
	// 		id
	// 	};
	// 	return this.http.put(`${this.url}/activate_programa`);
	// }


}
