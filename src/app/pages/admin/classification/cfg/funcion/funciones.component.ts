import { Component, OnInit } from '@angular/core';
import { Funciones } from '../../../../../common/interfaces/cfg.interface';
import { FuncionService } from '../../../../../common/services/cfg/funcion.service';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styles: []
})
export class FuncionesComponent {

  funciones: Funciones[];
  detalle: any;

  constructor(
		private funcion_service: FuncionService
	) {
		this.funciones = [];
		this.detalle = {
			id: '',
			id_finalidad: '',
			nom_finalidad: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.getFunciones();
	}

  getFunciones() {
		this.funcion_service.getFunciones()
			.subscribe((data: any) => {
				this.funciones = data;
			});
	}

	info(funcion: any) {
		this.detalle = funcion;
		this.funcion_service.getFinalidad(this.detalle.id_finalidad)
			.subscribe((data: any) => {
				this.detalle.nom_finalidad = data.nombre;
			});
	}

	eliminarActivar(id: string, bandera: boolean) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.funcion_service.eliminarFuncion(id, bandera)
			.subscribe((response: any) => {
				if (response.mensaje === 'eliminado') {
					console.log('Funcion Eliminada');
					this.getFunciones();
				} else {
					console.log('Funcion Activada');
					this.getFunciones();
				}
			});
	}

}