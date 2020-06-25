import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Ccosto } from '../../interfaces/ui.interface';
// import { runInThisContext } from 'vm';


import {HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';


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
			// console.log('id_centro', ccosto.id);
			return this.constants.getRequest(`/create_ccosto`, 'post', ccosto);
		} else {
			return this.constants.getRequest(`/update_ccosto`, 'put', ccosto);
		}
	}

	getCcosto(id: string) {
		return this.constants.getRequest(`/get_ccosto/${id}`, 'get', false);
	}

	getCcostos(id_empresa: string) {
		return this.constants.getRequest(`/get_ccostos/${id_empresa}`, 'get', false);
	}

	getCcostosByLevelAndCompany(datos: any) {
		return this.constants.getRequest('/get_ccostos_by_level_and_company', 'post', datos);
	}

	getResponsable() {
		return this.constants.getRequest('/get_responsable_ley', 'get', false);
	}

	getOficinaUnidad(id_area: string) {
		return this.constants.getRequest(`/get_oficina_unidad/${id_area}`, 'get', false);
	}

	getUltimoCentro() {
		return this.constants.getRequest(`/get_ult_centro`, 'get', false);
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

	validateFirstCc(id_empresa: string) {
		return this.constants.getRequest(`/validate_first_cc/${id_empresa}`, 'get', false);
	}

	validateResponsable(id_cc: string) {
		return this.constants.getRequest(`/validate_responsable/${id_cc}`, 'get', false);
	}

	establecerReponsable(id_cc: string) {
		return this.constants.getRequest(`/establecer_responsable/${id_cc}`, 'get', false);
	}

	// ** ////////////////////////// ** //
	// ******************************** //
	// ** FUNCIONES PARA CENTROS DE COSTO ADMIN ** //
	getUnidades(datos: any) {
		return this.constants.getRequest(`/get_unidades_empresa`, 'post', datos);
	}

	getNiveles(bandera: string) {
		// console.log('bandera en service', bandera);
		return this.constants.getRequest(`/get_niveles/${bandera}`, 'get', false);
	}

	getCentrosPadreAdmin(datos: any) {
		// console.log('datos desde el service', datos);
		return this.constants.getRequest('/get_centros_padre_admin', 'post', datos);
	}

	// ** ////////////////////////// ** //
	// ******************************** //
	// FUNCION PARA TRAER LA INFO DEL CENTRO SELECCIONADO //
	getDetalleCc(id_cc: string) {
		return this.constants.getRequest(`/get_detalle_cc/${id_cc}`, 'get', false);
	}
	// ** ////////////////////////// ** //
	// ******************************** //
	// ** FUNCIONES PARA CENTROS DE COSTO CLIENT ** //

	getCentrosPadreClient(datos: any) {
		return this.constants.getRequest('/get_centros_padre_client', 'post', datos);
	}
	
	getNivelesCcClient(id_cc: string) {
		return this.constants.getRequest(`/get_nivel_cc_client/${id_cc}`, 'get', false);
	}
	
	getUnidadesCcClient(info: any) {
		return this.constants.getRequest(`/get_unidades_cc_client`, 'post', info);
	}

	getUnidadCcClient(id_cc: any) {
		return this.constants.getRequest(`/get_unidad_cc_client/${id_cc}`, 'get', false);
	}

	// ** ////////////////////////// ** //
	// ******************************** //

	getUbicaciones(cp: string) {
		return this.constants.getRequest(`/get_asentamientos_cp/${cp}`, 'get', false);
	}

	getUbicacion(id: string) {
		return this.constants.getRequest(`/get_asentamiento/${id}`, 'get', false);
	}

	

	getInfoEmpresaPorCentroCosto(id_centro_costo: number){
		return this.constants.getRequest(`/get_info_empresa_por_centro_costo/${id_centro_costo}`, 'get', false);
	}
	
}
