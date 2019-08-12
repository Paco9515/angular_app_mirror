import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Ccosto } from '../../interfaces/ui.interface';


@Injectable({
	providedIn: 'root'
})
export class CcostoService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	createCcosto(ccosto: Ccosto) {
		if (ccosto.id === '') {
			return this.constants.getRequest(`/create_ccosto`, 'post', ccosto);
		} else {
			return this.constants.getRequest(`/update_ccosto`, 'put', ccosto);
		}
	}

	getCcosto(id: string) {
		return this.constants.getRequest(`/get_ccosto/${id}`, 'get', false);
	}

	getCcostos() {
		return this.constants.getRequest(`/get_ccostos`, 'get', false);
	}

	getUnidades(id:number) {
		return this.constants.getRequest(`/get_unidades_empresa/${id}`, 'get', false);
	}

	getUnidad(id: string) {
		return this.constants.getRequest(`/get_unidad/${id}`, 'get', false);
	}

	getEmpresas(){
		return this.constants.getRequest(`/get_empresas`, 'get', false);
	}

	getSubfunciones() {
		return this.constants.getRequest(`/get_subfunciones`, 'get', false);
	}

	getSubfuncion(id:string) {
		return this.constants.getRequest(`/get_subfuncion/${id}`, 'get', false);
	}


	eliminarCcosto(id: string, bandera:boolean) {
		if (bandera == true) {
			return this.constants.getRequest(`/activate_ccosto/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_ccosto/${id}`, 'put', false);
		}
	}

	


}
