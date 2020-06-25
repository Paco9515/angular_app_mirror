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
		if (unidad.id === '') {
			return this.constants.getRequest(`/create_unidad`, 'post', unidad);
		} else {
			return this.constants.getRequest(`/update_unidad`, 'put', unidad);
		}

	}

	getUnidadAdmin(id: string) {
		return this.constants.getRequest(`/get_unidad/${id}`, 'get', false);
	}

	getUnidadesAdmin(id_empresa: string) {
		return this.constants.getRequest(`/get_unidades/${id_empresa}`, 'get', false);
	}
	
	///////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////
	/* getSectorInstucional() {
		return this.constants.getRequest(`/get_sector_institucional`, 'get', false);
	}

	getSector() {
		return this.constants.getRequest(`/get_sector`, 'get', false);
	}
	
	getFinanciero() {
		return this.constants.getRequest(`/get_financiero`, 'get', false);
	}
	
	getEconomia() {
		return this.constants.getRequest(`/get_economia`, 'get', false);
	}
	
	getSubeconomia() {
		return this.constants.getRequest(`/get_subeconomia`, 'get', false);
	} */
	
	getClasifsAdmin() {
		return this.constants.getRequest(`/get_clasifs_admin`, 'get', false);
	}

	getClasifAdmin(id_clas: string) {
		return this.constants.getRequest(`/get_clasifs_admin/${id_clas}`, 'get', false);
	}
	///////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////

	getUltimaUnidad() {
		return this.constants.getRequest(`/get_ult_unidad`, 'get', null);
	}

	getEmpresas() {
		return this.constants.getRequest(`/get_empresas`, 'get', false);
	}

	getDetalleUnidad(id_unidad: string) {
		return this.constants.getRequest(`/get_detalle_unidad/${id_unidad}`, 'get', false);
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
