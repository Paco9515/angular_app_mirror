import { Component } from '@angular/core';
import { SubeconomiaService } from './../../../services/ca/subeconomia.service';
import { Subeconomias } from './../../../interfaces/ca.interface';
import { MensajesService } from './../../../services/shared/mensajes.service';

@Component({
  selector: 'app-subeconomias',
  templateUrl: './subeconomias.component.html',
  styles: []
})
export class SubeconomiasComponent {

  subeconomias: Subeconomias[];
  detalle: Subeconomias;

	constructor(
		private subeconomia_service: SubeconomiaService,
		private mensaje: MensajesService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_economia: '',
			nombre_economia: '',
			status_economia: true,
			id_financiero: '',
			nombre_financiero: '',
			status_financiero: true,
			id_sector: '',
			nombre_sector: '',
			status_sector: true
		};

		this.subeconomias = [];
		this.getSubeconomias();
	 }

	 getSubeconomias() {
		this.subeconomia_service.getSubeconomias()
			.subscribe((data: any) => {
				this.subeconomias = data;
		});
	}

	eliminarActivar(id: string, type: boolean) {
		this.subeconomia_service.activarEliminarSubeconomia(id, type)
			.subscribe((data: any) => {
				this.getSubeconomias();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}
