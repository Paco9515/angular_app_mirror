import { Component, OnInit } from '@angular/core';
import { Subfunciones } from '../../../interfaces/cfg/subfuncion';
import { SubfuncionService } from '../../../services/cfg/subfuncion.service';

@Component({
  selector: 'app-subfunciones',
  templateUrl: './subfunciones.component.html',
  styles: []
})
export class SubfuncionesComponent  {

  subfunciones: Subfunciones[];

  constructor(
		private subfuncion_service: SubfuncionService
	) {
		this.subfunciones = [];
		this.getSubfunciones();
	}

  getSubfunciones() {
		this.subfuncion_service.getSubfunciones()
			.subscribe((data: any) => {
				this.subfunciones = data;
				console.log('Constructor: ', this.subfunciones);
			});
	}

}
