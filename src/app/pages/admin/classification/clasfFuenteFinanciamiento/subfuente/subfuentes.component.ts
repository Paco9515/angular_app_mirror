import { Component, OnInit } from '@angular/core';
import { Subfuente } from '../../../../../common/interfaces/cff.interface';
import { SubfuenteService } from '../../../../../common/services/cff/subfuente.service';

@Component({
  selector: 'app-subfuentes',
  templateUrl: './subfuentes.component.html',
  styles: []
})
export class SubfuentesComponent {

  subfuentes: Subfuente[];
  detalle: any;

  	constructor(
		private subfuente_service: SubfuenteService
	) {
		this.subfuentes = [];
		this.detalle = {
			id: '',
			id_fuente: '',
			nom_fuente: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.getsubfuentes();
	}

  	getsubfuentes() {
		this.subfuente_service.getSubfuentes()
			.subscribe((data: any) => {
				this.subfuentes = data;
				// console.log('Constructor: ', this.subfuentes);
			});
	}

	info(subfuente: any) {
		this.detalle = subfuente;
		this.subfuente_service.getFuente(this.detalle.id_fuente)
			.subscribe((data: any) => {
				this.detalle.nom_fuente = data.nombre;
			});
	}

	eliminarActivar(id: string, bandera: boolean) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.subfuente_service.eliminarSubfuente(id, bandera)
			.subscribe((response: any) => {
				if (response.mensaje === 'eliminado') {
					console.log('Subfuente Eliminada');
					this.getsubfuentes();
				} else {
					console.log('Subfuente Activada');
					this.getsubfuentes();
				}
			});
	}

}
