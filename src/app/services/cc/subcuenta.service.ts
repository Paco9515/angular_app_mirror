import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class SubcuentaService {

  url: string;

	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

	getSubcuentas() {
		return this.http.get(`${ this.url }/get_subcuentas`);
  }

	activarSubcuenta(sector: any) {
		const body = {
			id: sector.id,
			nombre: sector.nombre
		};
		return this.http.put(`${this.url}/activar_subcuenta`, body);
	}

	createSubcuenta(sector: any) {
		const body = {
			id: sector.id,
			codigo: sector.codigo,
			nombre: sector.nombre
		};
		if (sector.id === '') {
			return this.http.post(`${ this.url }/create_subcuenta`, body);
		} else {
			return this.http.put(`${ this.url }/update_subcuenta`, body);
		}
	}

	getSubcuenta(id: string) {
		return this.http.get(`${ this.url }/get_subcuenta/${id}`);
	}


	eliminarSubcuenta(id: string) {
		return this.http.delete(`${this.url}/delete_subcuenta/${id}`);
	}

}
