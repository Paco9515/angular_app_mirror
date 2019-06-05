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

	constructor(
		private financiero_service: FinancieroService
	) {
		this.financieros = [];
		this.getFinancieros();
	 }

	 getFinancieros() {
		this.financiero_service.getFinancieros()
			.subscribe((data: any) => {
				this.financieros = data;
			});
		}

}
