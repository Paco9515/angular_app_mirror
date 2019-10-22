import { Component } from '@angular/core';
import { ClasAdministrativaService } from './../../../services/ca/clas-administrativa.service';
import { Clas_admin } from './../../../interfaces/ca.interface';
import { MensajesService } from './../../../services/shared/mensajes.service';

@Component({
  selector: 'app-clas-administrativas',
  templateUrl: './clas-administrativas.component.html',
  styles: []
})
export class ClasAdministrativasComponent {

	admins: Clas_admin[];
	detalle: Clas_admin;

	constructor(
		private administrativa_service: ClasAdministrativaService,
		private mensaje: MensajesService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_subeconomia: '',
			nombre_subeconomia: '',
			status_subeconomia: true,
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

		this.admins = [];
		this.getAdministrativas();
	 }

	getAdministrativas() {
		this.administrativa_service.getClasAdmins()
			.subscribe((data: any) => {
				this.admins = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.administrativa_service.activarEliminarClasAdmin(id, type)
			.subscribe((data: any) => {
				this.getAdministrativas();
				this.mensaje.success(data);
			},
			error => {
				this.mensaje.danger(error.error);
			});
	}
}
