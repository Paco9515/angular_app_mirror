import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Ctrabajo } from '../../interfaces/ui.interface';


@Injectable({
	providedIn: 'root'
})
export class CtrabajoService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	createCtrabajo(ctrabajo: Ctrabajo) {
		if (ctrabajo.id === '') {
			return this.constants.getRequest(`/create_ctrabajo`, 'post', ctrabajo);
		} else {
			return this.constants.getRequest(`/update_ctrabajo`, 'put', ctrabajo);
		}

	}

	getCtrabajo(id: string) {
		return this.constants.getRequest(`/get_ctrabajo/${id}`, 'get', false);
	}

	getCtrabajos() {
		return this.constants.getRequest(`/get_ctrabajos`, 'get', false);
	}

	getCentro(id: string) {
		return this.constants.getRequest(`/get_ccosto/${id}`, 'get', false);
	}

	getCentros(id: string) {
		return this.constants.getRequest(`/get_ccostosXuni/${id}`, 'get', false);
	}

	getUnidades() {
		return this.constants.getRequest(`/get_unidades/`, 'get', false);
	}

	eliminarCtrabajo(id: string, bandera: boolean) {
		if (bandera === true) {
			return this.constants.getRequest(`/activate_ctrabajo/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_ctrabajo/${id}`, 'put', false);
		}
	}


}
