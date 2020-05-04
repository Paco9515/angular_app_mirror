import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
			console.log('id_centro', ccosto.id);
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

	getUltimoCentro() {
		return this.constants.getRequest(`/get_ult_centro`, 'get', false);
	}

	getNiveles() {
		return this.constants.getRequest(`/get_niveles`, 'get', false);
	}

	getUnidades(id: string) {
		return this.constants.getRequest(`/get_unidades_empresa/${id}`, 'get', false);
	}

	getUnidad(id: string) {
		return this.constants.getRequest(`/get_unidad/${id}`, 'get', false);
	}

	getEmpresas() {
		return this.constants.getRequest(`/get_empresas`, 'get', false);
	}

	getSubfunciones() {
		return this.constants.getRequest(`/get_subfunciones`, 'get', false);
	}

	getSubfuncion(id: string) {
		return this.constants.getRequest(`/get_subfuncion/${id}`, 'get', false);
	}


	eliminarCcosto(id: string, bandera: boolean) {
		if (bandera === true) {
			return this.constants.getRequest(`/activate_ccosto/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_ccosto/${id}`, 'put', false);
		}
	}

	getCentrosCostoHijos(id: string){
		return this.constants.getRequest(`/get_centros_costos_hijos/${id}`, 'get', false);
	}

	getInfoEmpresaPorCentroCosto(id_centro_costo: number){
		return this.constants.getRequest(`/get_info_empresa_por_centro_costo/${id_centro_costo}`, 'get', false);
	}

}
