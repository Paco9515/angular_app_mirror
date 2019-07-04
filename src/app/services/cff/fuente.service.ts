import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Fuente } from '../../interfaces/cff.interface';


@Injectable({
	providedIn: 'root'
})
export class FuenteService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}
	createFuente(fuente: Fuente) {
		if (fuente.id === '') {
			return this.constants.getRequest(`/create_fuente`, 'post', fuente);
		} else {
			return this.constants.getRequest(`/update_fuente`, 'put', fuente);
		}

	}

	getFuente(id: string) {
		return this.constants.getRequest(`/get_fuente/${id}`, 'get', false);
	}

	getFuentes() {
		return this.constants.getRequest(`/get_fuentes`, 'get', false);
	}

	eliminarFuente(id: string, bandera:boolean) {
		if (bandera == true) {
			return this.constants.getRequest(`/activate_fuente/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_fuente/${id}`, 'put', false);
		}
	}


}
