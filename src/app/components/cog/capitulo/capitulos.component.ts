import { Component } from '@angular/core';
import { Capitulos } from 'src/app/interfaces/cog.interface';
import { CapituloService } from 'src/app/services/cog/capitulo.service';

@Component({
	selector: 'app-capitulos',
	templateUrl: './capitulos.component.html',
	styles: []
})
export class CapitulosComponent {

	capitulos: Capitulos[];
	detalle: Capitulos;

	constructor(
		private capitulo_service: CapituloService
	) {

		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true
		};

		this.capitulos = [];
		this.getCapitulos();
	}

	getCapitulos() {
		this.capitulo_service.getCapitulos()
			.subscribe((data: any) => {
				this.capitulos = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.capitulo_service.activarEliminarCapitulo(id, type)
			.subscribe((response: any) => {
				console.log(response.message);
				this.getCapitulos();
			}, error => {
				console.log('ERROR: ', error);
			});
	}

}
