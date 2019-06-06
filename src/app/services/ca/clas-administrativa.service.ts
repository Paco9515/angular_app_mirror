import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class ClasAdministrativaService {

	url: string;

	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {

		this.url = this.constants._url;
	 }

	getAdministrativas() {
		return this.http.get(`${ this.url }/get_administrativas`);
	}
}
