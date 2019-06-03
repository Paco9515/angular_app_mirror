import { Component, OnInit } from '@angular/core';
import { Fuente } from '../../../interfaces/cff/fuente';
import { FuenteService } from '../../../services/cff/fuente.service';

@Component({
  selector: 'app-fuentes',
  templateUrl: './fuentes.component.html',
  styles: []
})
export class FuentesComponent {

  fuentes: Fuente[];

  constructor(
		private fuente_service: FuenteService
	) {
		this.fuentes = [];
		this.getFuentes();
	}

  getFuentes() {
		this.fuente_service.getFuentes()
			.subscribe((data: any) => {
				this.fuentes = data;
				console.log('Constructor: ', this.fuentes);
			});
	}

}
