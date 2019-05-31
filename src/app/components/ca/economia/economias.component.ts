import { Component } from '@angular/core';
import { EconomiaService } from './../../../services/ca/economia.service';
import { Economicas } from './../../../interfaces/ca/economia';

@Component({
	selector: 'app-economias',
	templateUrl: './economias.component.html',
	styles: []
})
export class EconomiasComponent {

	economias: Economicas[];

	constructor(
		private administrativa_service: EconomiaService
	) {
		this.economias = [];
		this.getEconomicas();
	 }

	 getEconomicas() {
		this.administrativa_service.getEconomias()
			.subscribe((data: any) => {
				this.economias = data;
			});
		}

}
