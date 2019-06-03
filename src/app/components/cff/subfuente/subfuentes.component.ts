import { Component, OnInit } from '@angular/core';
import { Subfuente } from '../../../interfaces/cff/subfuente';
import { SubfuenteService } from '../../../services/cff/subfuente.service';

@Component({
  selector: 'app-subfuentes',
  templateUrl: './subfuentes.component.html',
  styles: []
})
export class SubfuentesComponent {

  subfuentes: Subfuente[];

  constructor(
		private subfuente_service: SubfuenteService
	) {
		this.subfuentes = [];
		this.getsubfuentes();
	}

  getsubfuentes() {
		this.subfuente_service.getSubfuentes()
			.subscribe((data: any) => {
				this.subfuentes = data;
				console.log('Constructor: ', this.subfuentes);
			});
	}

}
