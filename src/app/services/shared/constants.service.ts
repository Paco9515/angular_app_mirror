import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ConstantsService {

	readonly _url = 'http://localhost:8000';
	readonly url = 'http://localhost:8000';
	readonly url_direccion = 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/';

	readonly headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	constructor(
		private http: HttpClient
	) { }

	public getDireccionCP(cp: string) {
		return this.http.get(this.url_direccion + cp);
	}

	public createEgreso(url: string, _data: any, _partidas: any) {
		const data = {
			data: _data,
			partidas: _partidas
		};
		return this.http.post(this._url + url, data);
	}

	public getRequest(url: string, tipo: string, data: any) {

		switch (tipo) {
			case 'get':
				return this.http.get(this._url + url, {
					headers: this.headers
				});
			case 'post':
				return this.http.post(this._url + url, data);
			case 'put':
				return this.http.put(this._url + url, data);
			case 'delete':
				return this.http.delete(this._url + url, {
					headers: this.headers
				});
		}
	}
}
