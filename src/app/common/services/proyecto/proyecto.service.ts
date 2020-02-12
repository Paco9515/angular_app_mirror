import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
	providedIn: 'root'
})
export class ProyectoService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	postPresEgreso(data: any) {
		return this.constants.getRequest(`/create_presupuesto`, 'post', data);
	}

	getFasesProyecto(id: any) {
		return this.constants.getRequest(`/get_fase_proyecto/${id}`, 'get', false);
	}

	getProyectos() {
		return this.constants.getRequest(`/get_proyectos`, 'get', false);
	}



}
