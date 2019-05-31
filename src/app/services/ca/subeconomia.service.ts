import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class SubeconomiaService {

	url: string;

	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {

		this.url = this.constants.url;
	}

	getSubeconomias() {
		return this.http.get(`${ this.url }/get_subeconomias`);
	}

}
