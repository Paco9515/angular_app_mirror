import { Component } from '@angular/core';
import { Partidas } from './../../../interfaces/cog.interface';
import { PartidaService } from './../../../services/cog/partida.service';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styles: []
})
export class PartidasComponent {

	partidas: Partidas[];
	detalle: Partidas;

	constructor(
		private partida_service: PartidaService
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
			.subscribe((obj: any) => {
				// console.log(obj);
				this.getPartidas();
			}, error => {
				// console.log('ERROR: ', error.error);
			});
	}

}