import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CfgService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

  	getFinalidad(id: string) {
		return this.constants.getRequest(`/get_finalidad/${id}`, 'get', false);
	}

	getFinalidades() {
		return this.constants.getRequest(`/get_finalidades`, 'get', false);
  	}

  	getFuncion(id: string) {
		return this.constants.getRequest(`/get_funcion/${id}`, 'get', false);
	}

	getFunciones() {
		return this.constants.getRequest(`/get_funciones`, 'get', false);
  	}

  	getSubfuncion(id: string) {
		return this.constants.getRequest(`/get_subfuncion/${id}`, 'get', false);
	}

	getSubfunciones() {
		return this.constants.getRequest(`/get_subfunciones`, 'get', false);
	}

	getFunsFinalidad(id: number) {
		return this.constants.getRequest(`/get_funcion_finalidad/${id}`, 'get', false);
	}

	getSubsFuncion(id: number) {
		return this.constants.getRequest(`/get_subfunciones_funcion/${id}`, 'get', false);
	}
}
