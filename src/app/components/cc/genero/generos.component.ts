import { Component } from '@angular/core';
import { GeneroService } from './../../../services/cc/genero.service';
import { Generos } from '../../../interfaces/cc/generos';


@Component({
	selector: 'app-generos',
	templateUrl: './generos.component.html',
	styles: []
})
export class GenerosComponent {

	generos: Generos[];

	constructor(
		private genero_service: GeneroService
	){
		this.generos = [];
		this.getGeneros();
	}

	getGeneros() {
		this.genero_service.getGeneros()
			.subscribe((data: any) => {
				this.generos = data;
			});
	}






}
