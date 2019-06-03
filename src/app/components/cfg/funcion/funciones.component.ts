import { Component, OnInit } from '@angular/core';
import { Funciones } from '../../../interfaces/cfg/funcion';
import { FuncionService } from '../../../services/cfg/funcion.service';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styles: []
})
export class FuncionesComponent {

  funciones: Funciones[];

  constructor(
		private funcion_service: FuncionService
	) {
		this.funciones = [];
		this.getFunciones();
	}

  getFunciones() {
		this.funcion_service.getFunciones()
			.subscribe((data: any) => {
				this.funciones = data;
				console.log('Constructor: ', this.funciones);
			});
	}

}