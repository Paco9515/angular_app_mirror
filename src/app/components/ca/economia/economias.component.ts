import { Component } from '@angular/core';
import { EconomiaService } from './../../../services/ca/economia.service';
import { Economias } from './../../../interfaces/ca.interface';

@Component({
	selector: 'app-economias',
	templateUrl: './economias.component.html',
	styles: []
})
export class EconomiasComponent {

	economias: Economias[];
	detalle: Economias;

	constructor(
		private economia_service: EconomiaService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_financiero: '',
			nombre_financiero: '',
			id_sector: '',
			nombre_sector: ''
		};

		this.economias = [];
		this.getEconomias();
	 }

	 getEconomias() {
		this.economia_service.getEconomias()
			.subscribe((data: any) => {
				this.economias = data;
		});
	}

	eliminarActivar(id: string, type: boolean) {
		this.economia_service.activarEliminarEconomia(id, type)
			.subscribe((response: any) => {
				console.log(response.message);
				this.getEconomias();
			}, error => {
				console.log('ERROR: ', error);
			});
	}

}
