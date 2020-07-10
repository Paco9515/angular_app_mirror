import { Component, OnInit } from '@angular/core';
import { ProgramaService } from 'src/app/common/services/cp/programa.service';
import { Programas } from 'src/app/common/interfaces/cp.interface';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';
import { ConfigService } from '../../../../../config/config.service';
import { UbicacionGeografica } from '../../../../../common/interfaces/ubicacionGeografica.interface';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-programas',
	templateUrl: './programas.component.html'
})
export class ProgramasComponent implements OnInit {

	programas: Programas[];
	ubicacionGeografica: UbicacionGeografica;
	fileUrl;
	fileUrlpdf;

	readonly _url = 'http://localhost:8000';

	constructor(
		private programa_service: ProgramaService,
		private mensaje: MensajesService,
		private http: HttpClient,
		private configService: ConfigService,
		private sanitizer: DomSanitizer
	) {
		this.programas = [];
		this.getProgramas();
	}

	getProgramas() {
		this.programa_service.getProgramas()
			.subscribe((data: any) => this.programas = data);
	}

	eliminarActivar(id: string, type: boolean) {
		this.programa_service.activarEliminarPrograma(id, type)
			.subscribe((data: any) => {
				this.getProgramas();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	csv() {

		// return this.getRequest(`/excel/${2500}`, 'get', false);

		// return this.getRequest(`/excel/${2500}`, 'get', false)
		// 	.subscribe((data: any) => {
		// 			console.log(data);
		// 			// url = data.data;
		// 			window.location.href = data;
		// 			// this.mensaje.success(data);
		// 		}, error => {
		// 			this.mensaje.danger(error.error);
		// 		});

		// let contents;

		this.getRequest(`/excel/${2500}`, 'get', false)
			.subscribe( results => {

				// console.log(results);
				// const results = 'Hola mundo';

				const blob = new Blob([results], { type: 'application/csv' });
				// console.log('blob');
				// console.log(blob);

				this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
			});
	}

	pdf() {

		this.getPdf().subscribe((data: any) => {

			const blob = new Blob([data], {type: 'application/pdf'});

			this.fileUrlpdf = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));


			// var downloadURL = window.URL.createObjectURL(data);
			// var link = document.createElement('a');
			// link.href = downloadURL;
			// link.download = "help.pdf";
			// link.click();

		  });
	}

	ngOnInit() {
		/*const data = 'some text';
    	const blob = new Blob([data], { type: 'application/octet-stream' });

		this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));*/
		this.csv();
		this.pdf();
	}

	public getRequest(url: string, tipo: string, data: any) {


		return this.http.get(this._url + url, {responseType: 'text'})
		.pipe(
		  tap( // Log the result or error
			data => data,

			error => console.error(error)
		  )
		);

	}

	getPdf() {

		// this.authKey = localStorage.getItem('jwt_token');

		const httpOptions = {
		  responseType: 'blob' as 'json',
		//   headers: new HttpHeaders({
			// 'Authorization': this.authKey,
		//   })
		};

		return this.http.get(this._url + `/pdf/${2500}`, httpOptions);
	  }

}
