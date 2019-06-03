import { Component, OnInit } from '@angular/core';
import { FinalidadService } from '../../../services/cfg/finalidad.service';
import { Finalidad } from 'src/app/interfaces/cfg/finalidad';

@Component({
  selector: 'app-finalidades',
  templateUrl: './finalidades.component.html',
  styles: []
})
export class FinalidadesComponent {

  finalidades: Finalidad[];

  constructor(
		private finalidad_service: FinalidadService
	) {
		this.finalidades = [];
		this.getCcostos();
	}

  getCcostos() {
		this.finalidad_service.getFinalidades()
			.subscribe((data: any) => {
				this.finalidades = data;
				console.log('Constructor: ', this.finalidades);
			});
	}

}
