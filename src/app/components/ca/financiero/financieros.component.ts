import { Component } from '@angular/core';
import { FinancieroService } from './../../../services/ca/financiero.service';
import { Financieros } from './../../../interfaces/ca.interface';

@Component({
  selector: 'app-financieros',
  templateUrl: './financieros.component.html',
  styles: []
})
export class FinancierosComponent {

	financieros: Financieros[];
	detalle: Financieros;

	constructor(
		private financiero_service: FinancieroService
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
			.subscribe((obj: any) => {
				// console.log(obj);
				this.getFinancieros();
			}, error => {
				// console.log('ERROR: ', error);
			});
	}

}
