import { Component } from '@angular/core';
import { Subprograma } from 'src/app/common/interfaces/cp.interface';
import { SubprogramaService } from 'src/app/common/services/cp/subprograma.service';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';
@Component({
  selector: 'app-subprogramas',
  templateUrl: './subprogramas.component.html',
  styles: []
})
export class SubprogramasComponent {

	subprogramas: Subprograma[];
	detalle: Subprograma;

	constructor(
		private subprograma_service: SubprogramaService,
		private mensaje: MensajesService
	) {
		this.detalle = {
			id: '',
			id_programa: '',
			nombre_programa: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.subprogramas = [];
		this.getSubprogramas();
	}

	getSubprogramas() {
		this.subprograma_service.getSubprogramas()
			.subscribe((data: any) => {
				// console.log(data);
				this.subprogramas = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.subprograma_service.activarEliminarSubprograma(id, type)
			.subscribe((data: any) => {
				this.getSubprogramas();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}
}
