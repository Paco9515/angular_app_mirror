import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { UbicacionGeografica } from '../common/interfaces/ubicacionGeografica.interface';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	configUrl = 'http://localhost:8000/get_asentamiento/1';
	configUrl2 = 'http://localhost:8000/excel/250000';
	config: UbicacionGeografica;
	log;
	logError;



	readonly headers = new HttpHeaders({
		'Content-type': 'text/csv;charset=UTF-8',
		// 'Content-Disposition': 'attachment; filename=export.csv',
		// 'Access-Control-Allow-Headers': 'text/csv;charset=UTF-8',
		// 'Access-Control-Allow-Origin': 'http://localhost:4200',
		// 'Accept': '/'
	});


	constructor(private http: HttpClient) {}

	getConfig() {
		return this.http.get<UbicacionGeografica>(this.configUrl)
		.pipe(
		  catchError(this.handleError)
		);
	}

	getConfigResponse(): Observable<HttpResponse<UbicacionGeografica>> {
		return this.http.get<UbicacionGeografica>(
		  this.configUrl, { observe: 'response' });
	}


	  private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
		  // A client-side or network error occurred. Handle it accordingly.
		  console.error('An error occurred:', error.error.message);
		} else {
		  // The backend returned an unsuccessful response code.
		  // The response body may contain clues as to what went wrong,
		  console.error(
			`Backend returned code ${error.status}, ` +
			`body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError(
		  'Something bad happened; please try again later.');
	  }

}


