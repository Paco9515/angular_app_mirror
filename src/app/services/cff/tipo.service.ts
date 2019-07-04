import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Tipo } from '../../interfaces/cff.interface';


@Injectable({
	providedIn: 'root'
})
export class TipoService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	createTipo(tipo: Tipo) {

		if (tipo.id === '') {
			console.log(tipo);
			return this.constants.getRequest(`/create_tipo`, 'post', tipo);
		} else {
			return this.constants.getRequest(`/update_tipo`, 'put', tipo);
		}
	}

	getTipo(id: string) {
		return this.constants.getRequest(`/get_tipo/${id}`, 'get', false);
	}

	getTipos() {
		return this.constants.getRequest(`/get_tipos`, 'get', false);
	}

	getSubs(id:number) {
		return this.constants.getRequest(`/get_subfuentes_fuente/${id}`, 'get', false);
	}
	
	getSub(id:number) {
		return this.constants.getRequest(`/get_subfuente/${id}`, 'get', false);
	}

	getFuentes(){
		return this.constants.getRequest(`/get_fuentes`, 'get', false);
	}

	eliminarTipo(id: string, bandera:boolean) {
		if (bandera == true) {
			return this.constants.getRequest(`/activate_tipo/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_tipo/${id}`, 'put', false);
		}
	}


}
