import { Component } from '@angular/core';
import { GeneroService } from './../../../services/cc/genero.service';
import { Generos } from '../../../interfaces/cc.interface';
import { MensajesService } from './../../../services/shared/mensajes.service';
@Component({
	selector: 'app-generos',
	templateUrl: './generos.component.html',
	styles: []
})
export class GenerosComponent {

	generos: Generos[];
	detalle: Generos;

	constructor(
		private genero_service: GeneroService,
		private mensaje: MensajesService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.generos = [];
		this.getGeneros();
	}

	getGeneros() {
		this.genero_service.getGeneros()
			.subscribe((data: any) => {
				this.generos = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.genero_service.activarEliminarGenero(id, type)
			.subscribe((data: any) => {
				// console.log(obj);
				this.getGeneros();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}
