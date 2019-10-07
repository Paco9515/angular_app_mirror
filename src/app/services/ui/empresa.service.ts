import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Empresas, Infos } from '../../interfaces/ui.interface';


@Injectable({
	providedIn: 'root'
})
export class EmpresaService {

	url: string;
	headers: HttpHeaders;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
		this.headers = new HttpHeaders({
		 	'Content-Type': 'application/json'
		});
	}

	/* activarPrograma(programa: any) {
		const body = {
			id: programa.id,
			nombre: programa.nombre
		};

		return this.http.put(`${this.url}/activate_programa`, body);

	}

	*/

  	createEmpresa(empresa: Empresas, id: string) {
		empresa.id_info_gene = id;
		// console.log(empresa);
		if (empresa.id === '') {
			return this.constants.getRequest(`/create_empresa`, 'post', empresa);
		} else {
			console.log('empresa service', empresa);
			return this.constants.getRequest(`/update_empresa`, 'put', empresa);
		}
	}

	createInfo(info: Infos) {
		// console.log(info);
		 if (info.id === '') {
			return this.constants.getRequest(`/create_info`, 'post', info);
		} else {
			console.log('info service', info);
			return this.constants.getRequest(`/update_info`, 'put', info);
		}
	}

	getEmpresa(id: string) {
		return this.constants.getRequest(`/get_empresa/${id}`, 'get', null);
	}
	getInfo(id: number) {
		return this.constants.getRequest(`/get_infoGene/${id}`, 'get', null);
	}
	getTipo(id: number) {
		return this.constants.getRequest(`/get_tiposEmpresa/${id}`, 'get', null);
	}

	getEmpresas() {
		return this.constants.getRequest(`/get_empresas`, 'get', null);
	}

	getClasAdmis() {
		return this.constants.getRequest(`/get_administrativas`, 'get', null);
	}

	getClasAdmin(id: number) {
		return this.constants.getRequest(`/get_administrativa/${id}`, 'get', null);
	}

	activarEliminarEmpresa(id: string, bandera: boolean) {
		console.log('bandera', bandera);
		if (bandera === true) {
			return this.constants.getRequest(`/activate_empresa/${id}`, 'put', false);
		} else {
			return this.constants.getRequest(`/delete_empresa/${id}`, 'put', false);
		}
	}


}
