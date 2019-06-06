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

	constructor(
		private subeconomia_service: SubeconomiaService
	) {
		this.subeconomias = [];
		this.getSubeconomias();
	 }

	 getSubeconomias() {
		this.subeconomia_service.getSubeconomias()
			.subscribe((data: any) => {
				this.subeconomias = data;
			});
		}

		eliminar(id: string) {
			this.subeconomia_service.eliminarSubeconomia(id)
				.subscribe((response: any) => {
					this.getSubeconomias();
				}, error => {
					console.log('ERROR: ', error.error.message);
				});
			console.log('Eliminado con exito.');
		}

		activar(subeconomia: Subeconomias) {
			this.subeconomia_service.activarSubeconomia({
				id: subeconomia.id,
				nombre: subeconomia.nombre,
				status: !subeconomia.status
			}).subscribe((data: any) => {
					this.getSubeconomias();
				}, error => {
					console.log('ERROR: ', error.error.message);
				});
			console.log('Activado con exito.');
		}

}
