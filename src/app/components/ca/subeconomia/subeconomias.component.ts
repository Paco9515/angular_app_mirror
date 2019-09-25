import { Component } from '@angular/core';
import { SubeconomiaService } from './../../../services/ca/subeconomia.service';
import { Subeconomias } from './../../../interfaces/ca.interface';


@Component({
  selector: 'app-subeconomias',
  templateUrl: './subeconomias.component.html',
  styles: []
})
export class SubeconomiasComponent{

  subeconomias: Subeconomias[];
  detalle: Subeconomias;

	constructor(
		private subeconomia_service: SubeconomiaService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_economia: '',
			nombre_economia: '',
			id_financiero: '',
			nombre_financiero: '',
			id_sector: '',
			nombre_sector: '',
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
			.subscribe((response: any) => {
				console.log(response.message);
				this.getSubeconomias();
			}, error => {
				console.log('ERROR: ', error);
			});
	}

}
