import { Component, OnInit } from '@angular/core';
import { Subfunciones } from '../../../../../common/interfaces/cfg.interface';
import { SubfuncionService } from '../../../../../common/services/cfg/subfuncion.service';

@Component({
  selector: 'app-subfunciones',
  templateUrl: './subfunciones.component.html',
  styles: []
})
export class SubfuncionesComponent  {

  subfunciones: Subfunciones[];
  detalle: any;

  constructor(
		private subfuncion_service: SubfuncionService
	) {
		this.subfunciones = [];
		this.detalle = {
			id: '',
			id_funcion: null,
			nom_funcion: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.getSubfunciones();
	}

  	getSubfunciones() {
		this.subfuncion_service.getSubfunciones()
			.subscribe((data: any) => {
				this.subfunciones = data;
				// console.log('Constructor: ', this.subfunciones);
			});
	}
	info(subfuncion: any) {
		this.detalle = subfuncion;
		// console.log('detalle',this.detalle);
		this.subfuncion_service.getFuncion(this.detalle.id_funcion)
			.subscribe((data: any) => {
				this.detalle.nom_funcion = data.nombre;
			});
	}

	eliminarActivar(id: string, bandera: boolean) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.subfuncion_service.eliminarSubfuncion(id, bandera)
			.subscribe((response: any) => {
				if (response.mensaje === 'eliminado') {
					console.log('Subfuncion Eliminada');
					this.getSubfunciones();
				} else {
					console.log('Subfuncion Activada');
					this.getSubfunciones();
				}
			});
	}

}
