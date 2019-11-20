import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PartidaService } from 'src/app/common/services/cog/partida.service';
import { Conceptos, Partidas, Capitulos } from 'src/app/common/interfaces/cog.interface';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';


@Component({
	selector: 'app-partida',
	templateUrl: './partida.component.html',
	styles: []
})
export class PartidaComponent implements OnInit {
	capitulos: Capitulos[];
	conceptos: Conceptos[];
	partidas: Partidas[];
	partida: Partidas;

	concepto = true;
	genero = true;

	constructor(
		private partidaService: PartidaService,
		private activitedRoute: ActivatedRoute,
		private mensaje: MensajesService
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
	}

	ngOnInit() {
		this.partidaService.getCapitulos()
		.subscribe((data: any) => {
			this.capitulos = data;
		});

		this.activitedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarPartida(data.id);
			}
		});
	}

	onChangeCapitulo(id_capitulo) {
		this.partida.id_concepto = '';
		this.conceptos = [];

		this.concepto = false;

		if (id_capitulo !== '') {
			this.partida.id_capitulo = id_capitulo;
			this.partidaService.get_conceptos_capitulo(id_capitulo)
				.subscribe((obj: any) => {
					this.conceptos = obj.data;
				});
		}
	}

	onChangeConcepto(id_concepto) {
		this.partida.id_concepto = id_concepto;
	}

	cargarPartida(id: string) {
		this.partidaService.getPartidaId(id)
			.subscribe((obj: any) => {
			this.partida = obj.data;
			const CONCEPTO = this.partida.id_concepto;
			this.onChangeCapitulo(this.partida.id_capitulo);
			this.onChangeConcepto(CONCEPTO);
		}, error => {
			this.mensaje.danger(error.error, 'panel-adm/partidas');
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.partidaService.createUpdatePartida(this.partida)
				.subscribe((data: any) => {
					this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
		}
	}

}
