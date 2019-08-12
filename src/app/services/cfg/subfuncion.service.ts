import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Subfunciones } from '../../interfaces/cfg.interface';


@Injectable({
	providedIn: 'root'
})
export class SubfuncionService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	createSubfuncion(subfuncion: Subfunciones) {
		if (subfuncion.id === '') {
			return this.constants.getRequest(`/create_subfuncion`, 'post', subfuncion);
		} else {
			return this.constants.getRequest(`/update_subfuncion`, 'put', subfuncion);
		}

	}

	getSubfuncion(id: string) {
		return this.constants.getRequest(`/get_subfuncion/${id}`, 'get', false);
	}

	getSubfunciones() {
		return this.constants.getRequest(`/get_subfunciones`, 'get', false);
	}

	getFunciones(id:number) {
		return this.constants.getRequest(`/get_funcion_finalidad/${id}`, 'get', false);
	}

	getFuncion(id: string) {
		return this.constants.getRequest(`/get_funcion/${id}`, 'get', false);
	}

	getFinalidades(){
		return this.constants.getRequest(`/get_finalidades`, 'get', false);
	}

	getFunciones2() {
		return this.constants.getRequest(`/get_ccostos/`, 'get', false);
	}

	eliminarSubfuncion(id: string, bandera:boolean) {
		if (bandera == true) {
			return this.constants.getRequest(`/activate_subfuncion/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_subfuncion/${id}`, 'put', false);
		}
	}


}
