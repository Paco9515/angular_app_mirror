import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

	url: string;

  constructor(
	private http: HttpClient,
	private constants: ConstantsService
	) {

		this.url = this.constants.url;
  }

  	 getCuentas() {
		return this.http.get(`${ this.url }/get_cuentas`);
	}

	activarCuenta(cuenta: any) {
		const body = {
			id: cuenta.id,
			nombre: cuenta.nombre
		};
		return this.http.put(`${this.url}/activar_cuenta`, body);
	}

	createCuenta(cuenta: any) {
		const body = {
			id: cuenta.id,
			codigo: cuenta.codigo,
			nombre: cuenta.nombre
		};
		if (cuenta.id === '') {
			return this.http.post(`${ this.url }/create_cuenta`, body);
		} else {
			return this.http.put(`${ this.url }/update_cuenta`, body);
		}
	}

	getCuenta(id: string) {
		return this.http.get(`${ this.url }/get_cuenta/${id}`);
	}

	eliminarCuenta(id: string) {
		return this.http.delete(`${this.url}/delete_cuenta/${id}`);
	}
}
