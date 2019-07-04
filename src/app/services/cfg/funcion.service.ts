import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';


@Injectable({
	providedIn: 'root'
})
export class FuncionService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}


	createFuncion(funcion: any) {
		if (funcion.id === '') {
			return this.constants.getRequest(`/create_funcion`, 'post', funcion);
		} else {
			return this.constants.getRequest(`/update_funcion`, 'put', funcion);
		}

	}

	getFuncion(id: string) {
		return this.constants.getRequest(`/get_funcion/${id}`, 'get', false);
	}

	getFunciones() {
		return this.constants.getRequest(`/get_funciones`, 'get', false);
	}

	getFinalidades() {
		return this.constants.getRequest(`/get_finalidades`, 'get', false);
	}
	getFinalidad(id:number) {
		return this.constants.getRequest(`/get_finalidad/${id}`, 'get', false);
	}

	eliminarFuncion(id: string, bandera:boolean) {
		if (bandera == true) {
			return this.constants.getRequest(`/activate_funcion/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_funcion/${id}`, 'put', false);
		}
	}


}
