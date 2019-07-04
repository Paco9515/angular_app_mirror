import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PartidaService } from 'src/app/services/cog/partida.service';
import { Conceptos, Partidas, Capitulos } from 'src/app/interfaces/cog.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-partida',
    templateUrl: './partida.component.html',
    styles: []
})
export class PartidaComponent implements OnInit {

	capitulos: Capitulos;
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
			id_capitulo: '',
			nombre_capitulo: '',
			id_concepto: '',
			nombre_concepto: ''
		};



		this.partidaService.getConceptos().subscribe((data: any) => {
			this.conceptos = data;
		});

		this.partidaService.getCapitulos().subscribe((data: any) => {
			this.capitulos = data;
		});

	}

	ngOnInit(){
		this.activitedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarPartida(data.id);
			}
		});
	}

	cargarPartida(id: string) {
		this.partidaService.getPartida(id)
			.subscribe((obj: Partidas) => this.partida = obj);
	}

	guardar(f: NgForm) {
		console.log(f);
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
