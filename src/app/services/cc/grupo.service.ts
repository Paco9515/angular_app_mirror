import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './../constants.service';

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
}
