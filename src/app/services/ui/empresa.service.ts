import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
<<<<<<< HEAD
import { Programas } from 'src/app/interfaces/cp.interface';
=======
import { Empresas } from '../../interfaces/ui.interface';
>>>>>>> c4d54a84c3aee2ca0d3a8d117873165326d6a074


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

<<<<<<< HEAD
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
=======
	createEmpresa(empresa: Empresas) {
		console.log(empresa);
		  if (empresa.id === '') {
			return this.http.post(`${this.url}/create_empresa`, empresa);
		} else {
			return this.http.put(`${this.url}/update_empresa`, empresa);
		}    
>>>>>>> c4d54a84c3aee2ca0d3a8d117873165326d6a074

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
