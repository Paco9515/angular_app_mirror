import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Fase, PartidaFase } from 'src/app/common/interfaces/pe.interface';

@Component({
	selector: 'app-detalle-fase',
	templateUrl: './detalle-fase.component.html',
	styleUrls: ['./detalle-fase.component.css']
})
export class DetalleFaseComponent implements DoCheck {

	@Input() fase: Fase;
	num_interior = 'S/N';
	total: number = 0;

	constructor() {
	}

	ngDoCheck(): void {
		if (this.fase) {
			this.fase.num_interior = (this.fase.num_interior) ?  this.fase.num_interior : 'S/N';
			if (this.fase.partidas.length !== 0) {
				this.total = this.fase.partidas.reduce((contador, partida) => contador + partida.importe, 0);
			}
		}
	}

}
