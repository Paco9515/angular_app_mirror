import { Component } from '@angular/core';
import { EconomiaService } from './../../../services/ca/economia.service';
import { Economias } from './../../../interfaces/ca.interface';
import { MensajesService } from './../../../services/shared/mensajes.service';


@Component({
	selector: 'app-economias',
	templateUrl: './economias.component.html',
	styles: []
})
export class EconomiasComponent {

	economias: Economias[];
	detalle: Economias;

	constructor(
		private economia_service: EconomiaService,
		private mensaje: MensajesService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_financiero: '',
			nombre_financiero: '',
			status_financiero: true,
			id_sector: '',
			nombre_sector: '',
			status_sector: true
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
			.subscribe((data: any) => {
				this.getEconomias();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}
