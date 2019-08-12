import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

  	getEmpresa(id: any) {
		return this.constants.getRequest(`/get_empresa/${id}`, 'get', null);
	}

	getEmpresa_class(id: any) {
		return this.constants.getRequest(`/get_empresa_class/${id}`, 'get', null);
	}

	getEmpresas() {
		return this.constants.getRequest(`/get_soloempresas`, 'get', null);
	}

  	getUnidadAdmin(id: string) {
		return this.constants.getRequest(`/get_unidad/${id}`, 'get', false);
	}

	getUnidadesAdmin() {
		return this.constants.getRequest(`/get_unidades`, 'get', false);
  	}

  	getCcosto(id: string) {
		return this.constants.getRequest(`/get_ccosto/${id}`, 'get', false);
	}

	getCcostos() {
		return this.constants.getRequest(`/get_ccostos`, 'get', false);
	}

  	getCtrabajo(id: string) {
		return this.constants.getRequest(`/get_ctrabajo/${id}`, 'get', false);
	}

	getCtrabajos() {
		return this.constants.getRequest(`/get_ctrabajos`, 'get', false);
	}

	getUnisEmpresa(id: number) {
		return this.constants.getRequest(`/get_unidades_empresa/${id}`, 'get', false);
	  }

	getCcsUnidad(id: number) {
		return this.constants.getRequest(`/get_ccostosXuni/${id}`, 'get', false);
	}

	getCtsCcosto(id: number) {
		return this.constants.getRequest(`/get_ctrabajos_ccosto/${id}`, 'get', false);
	}

	getSubfuncion(id: number) {
		return this.constants.getRequest(`/get_subfuncion/${id}`, 'get', false);
	}
}
