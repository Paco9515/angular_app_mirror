import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Subfuente } from '../../interfaces/cff.interface';


@Injectable({
	providedIn: 'root'
})
export class SubfuenteService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	createSubfuente(subfuente: Subfuente) {
		if (subfuente.id === '') {
			return this.constants.getRequest(`/create_subfuente`, 'post' ,subfuente);
		} else {
			return this.constants.getRequest(`/update_subfuente`, 'put', subfuente);
		}

	}

	getSubfuente(id: string) {
		return this.constants.getRequest(`/get_subfuente/${id}`, 'get', false);
	}

	getSubfuentes() {
		return this.constants.getRequest(`/get_subfuentes`, 'get', false);
	}

	getFuentes() {
		return this.constants.getRequest(`/get_fuentes`, 'get', false);
	}
	getFuente(id:number) {
		return this.constants.getRequest(`/get_fuente/${id}`, 'get', false);
	}

	eliminarSubfuente(id: string, bandera:boolean) {
		if (bandera == true) {
			return this.constants.getRequest(`/activate_subfuente/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_subfuente/${id}`, 'put', false);
		}
	}

}
