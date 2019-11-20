import { Component } from '@angular/core';
import { Conceptos } from '../../../../../common/interfaces/cog.interface';
import { ConceptoService } from '../../../../../common/services/cog/concepto.service';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';

@Component({
	selector: 'app-conceptos',
	templateUrl: './conceptos.component.html',
	styles: []
})
export class ConceptosComponent {

	conceptos: Conceptos[];
	detalle: Conceptos;

	constructor(
		private concepto_service: ConceptoService,
		private mensaje: MensajesService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_capitulo: '',
			nombre_capitulo: '',
			status_capitulo: true,
			id_gasto: '',
			nombre_gasto: '',
			status_gasto: true
		};
		this.conceptos = [];
		this.getConceptos();
	}

	getConceptos() {
		this.concepto_service.getConceptos()
			.subscribe((data: any) => {
				// console.log(data);
				this.conceptos = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.concepto_service.activarEliminarConcepto(id, type)
			.subscribe((data: any) => {
				this.getConceptos();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}


}
