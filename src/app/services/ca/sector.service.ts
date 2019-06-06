import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
@Injectable({
  providedIn: 'root'
})
export class SectorService {

	url: string;

	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	activarSector(sector: any) {
		const body = {
			id: sector.id,
			nombre: sector.nombre
		};
		return this.http.put(`${this.url}/activate_sector`, body);
	}

	createSector(sector: any) {
		const body = {
			id: sector.id,
			codigo: sector.codigo,
			nombre: sector.nombre
		};
		if (sector.id === '') {
			return this.http.post(`${ this.url }/create_sector`, body);
		} else {
			return this.http.put(`${ this.url }/update_sector`, body);
		}
	}

	getSector(id: string) {
		return this.http.get(`${ this.url }/get_sector/${id}`);
	}

	getSectores() {
		return this.http.get(`${ this.url }/get_sectores`);
	}

	eliminarSector(id: string) {
		return this.http.delete(`${this.url}/delete_sector/${id}`);
	}

}