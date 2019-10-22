import { Component } from '@angular/core';
import { SectorService } from './../../../services/ca/sector.service';
import { Sectores } from './../../../interfaces/ca.interface';
import { MensajesService } from './../../../services/shared/mensajes.service';

@Component({
  selector: 'app-sectores',
  templateUrl: './sectores.component.html',
  styles: []
})
export class SectoresComponent {

	sectores: Sectores[];
	detalle: Sectores;

	constructor(
		private sectores_service: SectorService,
		private mensaje: MensajesService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true
		};

		this.sectores = [];
		this.getSectores();
	 }

	getSectores() {
		this.sectores_service.getSectores()
			.subscribe((data: any) => {
				this.sectores = data;
			});
		}

	eliminarActivar(id: string, type: boolean) {
		this.sectores_service.activarEliminarSector(id, type)
			.subscribe((data: any) => {
				this.getSectores();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}
}