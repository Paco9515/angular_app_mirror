import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
	providedIn: 'root'
})
export class ConceptoService {

url: String;

    constructor(
        private http: HttpClient,
    private constants: ConstantsService
    ) {
        this.url = this.constants.url;
    }

    getConceptos(){
        return this.http.get(`${this.url}/get_conceptos`);
    }

    activarConcepto(concepto: any) {
		const body = {
			id: concepto.id,
			nombre: concepto.nombre
		};
		return this.http.put(`${this.url}/activar_concepto`, body);
	}

	createConcepto(concepto: any) {
		const body = {
			id: concepto.id,
			codigo: concepto.codigo,
			nombre: concepto.nombre
		};
		if (concepto.id === '') {
			return this.http.post(`${ this.url }/create_concepto`, body);
		} else {
			return this.http.put(`${ this.url }/update_concepto`, body);
		}
	}

	getConcepto(id: string) {
		return this.http.get(`${ this.url }/get_concepto/${id}`);
	}

	eliminarConcepto(id: string) {
		return this.http.delete(`${this.url}/delete_concepto/${id}`);
	}

}