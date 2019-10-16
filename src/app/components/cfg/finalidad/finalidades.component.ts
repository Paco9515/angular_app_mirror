import { Component, OnInit } from '@angular/core';
import { FinalidadService } from '../../../services/cfg/finalidad.service';
import { Finalidad } from 'src/app/interfaces/cfg.interface';

@Component({
  selector: 'app-finalidades',
  templateUrl: './finalidades.component.html',
  styles: []
})
export class FinalidadesComponent {

  finalidades: Finalidad[];
  detalle: any;

  constructor(
		private finalidad_service: FinalidadService
	) {
		this.finalidades = [];
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.getFinalidad();
	}

  	getFinalidad() {
		this.finalidad_service.getFinalidades()
			.subscribe((data: any) => {
				this.finalidades = data;
				// console.log('Constructor: ', this.finalidades);
			});
	}

	info(finalidad: any) {
		this.detalle = finalidad;
	}

	eliminarActivar(id: string, bandera: boolean) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.finalidad_service.eliminarFinalidad(id, bandera)
			.subscribe((response: any) => {
				if (response.mensaje === 'eliminado') {
					console.log('Finalidad Eliminada');
					this.getFinalidad();
				} else {
					console.log('Finalidad Activada');
					this.getFinalidad();
				}
			});
	}

}
