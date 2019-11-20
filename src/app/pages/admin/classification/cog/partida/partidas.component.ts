import { Component } from '@angular/core';
import { Partidas } from '../../../../../common/interfaces/cog.interface';
import { PartidaService } from '../../../../../common/services/cog/partida.service';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';


@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styles: []
})
export class PartidasComponent {

	partidas: Partidas[];
	detalle: Partidas;

	constructor(
		private partida_service: PartidaService,
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
			id_concepto: '',
			nombre_concepto: '',
			status_concepto: true
		};
		this.partidas = [];
		this.getPartidas();
	}

	getPartidas() {
		this.partida_service.getPartidas()
			.subscribe((data: any) => {
				this.partidas = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.partida_service.activarEliminarPartida(id, type)
			.subscribe((data: any) => {
				this.getPartidas();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}