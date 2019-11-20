import { Component } from '@angular/core';
import { FinancieroService } from '../../../../../common/services/ca/financiero.service';
import { Financieros } from '../../../../../common/interfaces/ca.interface';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';

@Component({
  selector: 'app-financieros',
  templateUrl: './financieros.component.html',
  styles: []
})
export class FinancierosComponent {

	financieros: Financieros[];
	detalle: Financieros;

	constructor(
		private financiero_service: FinancieroService,
		private mensaje: MensajesService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_sector: '',
			nombre_sector: '',
			status_sector: true
		};
		this.financieros = [];
		this.getFinancieros();
	 }

	 getFinancieros() {
		this.financiero_service.getFinancieros()
			.subscribe((obj: any) => {
				this.financieros = obj;
		});
	}

	eliminarActivar(id: string, type: boolean) {
		this.financiero_service.activarEliminarFinanciero (id, type)
			.subscribe((data: any) => {
				this.getFinancieros();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}
