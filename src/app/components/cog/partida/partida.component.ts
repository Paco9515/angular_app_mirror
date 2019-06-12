import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PartidaService } from 'src/app/services/cog/partida.service';
import { Conceptos, Partidas } from 'src/app/interfaces/cog.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-partida',
    templateUrl: './partida.component.html',
    styles: []
})
export class PartidaComponent {

    conceptos: Conceptos;
    partida: Partidas;

    constructor(
		private partidaService: PartidaService,
		private activitedRoute: ActivatedRoute
		) {
		this.partida = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_concepto: '',
			nombre_concepto: '',
		};

		this.activitedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				console.log(data.id);
				this.cargarPartida(data.id);
			}
		});

		this.partidaService.getConceptos()
			.subscribe((data: any) => {
				this.conceptos = data;
		});
	}

	cargarPartida(id: string) {
		this.partidaService.getPartida(id)
			.subscribe((obj: Partidas) => this.partida = obj);
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.partidaService.createUpdatePartida(this.partida)
				.subscribe((response: any) => {
					console.log(response);
				}, error => {
					console.log(error.error);
			});
		}
	}
}
