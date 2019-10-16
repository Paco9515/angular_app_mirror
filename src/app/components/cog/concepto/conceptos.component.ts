import { Component } from '@angular/core';
import { Conceptos } from './../../../interfaces/cog.interface';
import { ConceptoService } from './../../../services/cog/concepto.service';
import { NotificationsServices } from './../../../services/shared/notifications.service';

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
		private toastr: NotificationsServices
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

	showMessage(data: any) {
		if ( data.status ) {
			return this.toastr.show( data.message, data.title, 'toast-warning' );
		}
		return this.toastr.show(data.message, data.title,  'toast-error ');
	}

	eliminarActivar(id: string, type: boolean) {
		this.concepto_service.activarEliminarConcepto(id, type)
			.subscribe((data: any) => {
				// console.log(response);
				this.showMessage(data);
				this.getConceptos();
			}, error => {
				this.showMessage(error.error);
			});
	}


}
