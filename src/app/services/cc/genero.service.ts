import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

	url: string;

	constructor(
		private http: HttpClient,
			private constants: ConstantsService
		) {

		this.url = this.constants.url;

	}

	 getGeneros(){
		return this.http.get(`${ this.url }/get_generos`);
	}

}
