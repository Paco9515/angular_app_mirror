import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Finalidad } from '../../interfaces/cfg.interface';


@Injectable({
	providedIn: 'root'
})
export class FinalidadService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	createFinalidad(finalidad: Finalidad) {
		if (finalidad.id === '') {
			return this.constants.getRequest(`/create_finalidad`, 'post', finalidad);
		} else {
			return this.constants.getRequest(`/update_finalidad`, 'put', finalidad);
		}

	}

	getFinalidad(id: string) {
		return this.constants.getRequest(`/get_finalidad/${id}`, 'get', false);
	}

	getFinalidades() {
		return this.constants.getRequest(`/get_finalidades`, 'get', false);
	}

	eliminarFinalidad(id: string, bandera:boolean) {
		if (bandera == true) {
			return this.constants.getRequest(`/activate_finalidad/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_finalidad/${id}`, 'put', false);
		}
	}

}
