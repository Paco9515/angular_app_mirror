import { Component } from '@angular/core';
import { Capitulos } from 'src/app/interfaces/cog.interface';
import { CapituloService } from 'src/app/services/cog/capitulo.service';
import { MensajesService } from './../../../services/shared/mensajes.service';

@Component({
	selector: 'app-capitulos',
	templateUrl: './capitulos.component.html',
	styles: []
})
export class CapitulosComponent {

	capitulos: Capitulos[];
	detalle: Capitulos;

	constructor(
		private capitulo_service: CapituloService,
		private mensaje: MensajesService
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
			.subscribe((data: any) => {
				this.getCapitulos();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}
