import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

	url: string;

	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	getGrupos() {
		return this.http.get(`${ this.url }/get_grupos`);
	}

	getGrupo(id: string) {
		this.http.get(`${ this.url }/get_grupo`);
	}

	createGrupo(grupo: any) {
		const body = {
			id: grupo.id,
			nombre: grupo.nombre
		};
		this.http.post(`${ this.url }/create_grupo`, body);
	}

	activarGrupo(grupo: any) {
		const body = {
			id: grupo.id,
			nombre: grupo.nombre
		};
		return this.http.put(`${ this.url }/activar_grupo`, body);
	}

	eliminarGrupo(id: string) {
		return this.http.delete(`${this.url}/delete_grupo/${id}`);
	}
}
