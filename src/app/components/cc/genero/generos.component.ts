import { Component } from '@angular/core';
import { GeneroService } from './../../../services/cc/genero.service';
import { Generos } from '../../../interfaces/cc.interface';


@Component({
	selector: 'app-generos',
	templateUrl: './generos.component.html',
	styles: []
})
export class GenerosComponent {

	generos: Generos[];

	constructor(
		private genero_service: GeneroService
	) {
		this.generos = [];
		this.getGeneros();
	}

	getGeneros() {
		this.genero_service.getGeneros()
			.subscribe((data: any) => {
				this.generos = data;
			});
	}

	eliminar(id: string, index: string) {
		this.genero_service.eliminarGenero(id)
			.subscribe((data: any) => {
				this.getGeneros();
			}, error => {
				console.log('ERROR', error.error.message);
			});
			console.log('Eliminado con exito.');
	}

	activar(genero: Generos, index: string) {
		this.genero_service.activarGenero(genero)
			.subscribe((data: any) => {
				this.getGeneros();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Activado con exito.');
	}




}
