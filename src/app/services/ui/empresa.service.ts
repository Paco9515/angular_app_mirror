import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Empresas } from '../../interfaces/ui.interface';


@Injectable({
	providedIn: 'root'
})
export class EmpresaService {

	url: string;
	headers: HttpHeaders;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
		this.headers = new HttpHeaders({
		 	'Content-Type': 'application/json'
		});
	}

	/* activarPrograma(programa: any) {
		const body = {
			id: programa.id,
			nombre: programa.nombre
		};

		return this.http.put(`${this.url}/activate_programa`, body);
	}

	*/

	createEmpresa(empresa: Empresas) {
		console.log(empresa);
		  if (empresa.id === '') {
			return this.http.post(`${this.url}/create_empresa`, empresa);
		} else {
			return this.http.put(`${this.url}/update_empresa`, empresa);
		}

	}

	getEmpresa(id: string) {
		return this.http.get(`${this.url}/get_empresa/${id}`);
	}

	getEmpresas() {
		return this.http.get(`${this.url}/get_empresas`);
		// return `${this.url}/get_programas`;
	}

	getClasAdmis() {
		return this.http.get(`${this.url}/get_administrativas`);
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
