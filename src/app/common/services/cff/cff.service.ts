import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CffService {

  	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

  	getFuente(id: string) {
		return this.constants.getRequest(`/get_fuente/${id}`, 'get', false);
	}

	getFuentes() {
		return this.constants.getRequest(`/get_fuentes`, 'get', false);
  	}

  	getSubfuente(id: string) {
		return this.constants.getRequest(`/get_subfuente/${id}`, 'get', false);
	}

	getSubfuentes() {
		return this.constants.getRequest(`/get_subfuentes`, 'get', false);
  	}

  	getTipo(id: string) {
		return this.constants.getRequest(`/get_tipo/${id}`, 'get', false);
	}

	getTipos() {
		return this.constants.getRequest(`/get_tipos`, 'get', false);
	}

  	getSubsFuente(id: number) {
		return this.constants.getRequest(`/get_subfuentes_fuente/${id}`, 'get', false);
	}

	getTiposSub(id: number) {
		return this.constants.getRequest(`/get_tipos_subfuente/${id}`, 'get', false);
	}
}
