import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { UnidadesAdmin } from '../../interfaces/ui.interface';


@Injectable({
	providedIn: 'root'
})
export class UnidadesAdminService {

	url: string;
	// headers: HttpHeaders;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;

	}


	createUnidad(unidad: UnidadesAdmin) {
		// console.log('servicio', unidad);

		if (unidad.id === '') {
			return this.constants.getRequest(`/create_unidad`, 'post', unidad);
		} else {
			return this.constants.getRequest(`/update_unidad`, 'put', unidad);
		}

	}

	getUnidadAdmin(id: string) {
		return this.constants.getRequest(`/get_unidad/${id}`, 'get', false);
	}

	getUnidadesAdmin() {
		return this.constants.getRequest(`/get_unidades`, 'get', false);
	}

	getUltimaUnidad() {
		return this.constants.getRequest(`/get_ult_unidad`, 'get', null);
	}

	getEmpresas() {
		return this.constants.getRequest(`/get_empresas`, 'get', false);
	}
	getEmpresa(id: string) {
		return this.constants.getRequest(`/get_empresa/${id}`, 'get', false);
	}

	activarEliminarUnidad(id: string, bandera: boolean) {
		// console.log('bandera',bandera);
		if (bandera === true) {
			return this.constants.getRequest(`/activate_unidad/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_unidad/${id}`, 'put', false);
		}
	}

}
