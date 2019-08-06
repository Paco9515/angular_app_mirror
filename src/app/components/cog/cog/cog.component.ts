import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CogService } from 'src/app/services/cog/cog.service';
import { Capitulos, Conceptos, Partidas } from 'src/app/interfaces/cog.interface';

@Component({
	selector: 'app-cog',
	templateUrl: './cog.component.html',
	styles: []
})
export class CogComponent implements OnInit {

	@Input() primary_keys: any;
	capitulos: Capitulos[];
	conceptos: Conceptos[];
	partidas: Partidas[];
	data: any;

	@Output() out = new EventEmitter<any>();

	constructor(
		private cog_service: CogService
	) {
		this.data = {
			id_capitulo: '',
			id_concepto: '',
			id_partida: '',
			nombre: '',
			codigo: ''
		};
		this.out.emit(this.data);
	}

	ngOnInit() {
		this.cog_service.getCapitulos()
			.subscribe((data: any) => {
				this.capitulos = data;
			});

		if (this.primary_keys[0] !== 0) {
			this.onChangeCapitulo(this.primary_keys[0]);
			this.onChangeConcepto(this.primary_keys[1]);
			this.onChangePartida(this.primary_keys[2]);
		}
	}

	onChangeCapitulo(id_capitulo) {
		this.data.id_capitulo = id_capitulo;
		this.data.id_concepto = '';
		this.data.id_partida = '';
		this.conceptos = [];
		this.partidas = [];
		if (id_capitulo !== '') {
			this.data.id_capitulo = id_capitulo;
			this.cog_service.get_conceptos_capitulo(id_capitulo)
				.subscribe((data: any) => {
					this.conceptos = data;
				});
		}
	}

	onChangeConcepto(id_concepto) {
		this.data.id_partida = '';
		this.partidas = [];
		if (id_concepto !== '') {
			this.data.id_concepto = id_concepto;
			this.cog_service.get_partidas_concepto(id_concepto)
				.subscribe((data: any) => {
					this.partidas = data;
				});
		}
	}

	onChangePartida(id_partida) {
		this.data.id_partida = id_partida;
		this.data.codigo = this.partidas[id_partida].codigo;
		this.data.nombre = this.partidas[id_partida].nombre;
		this.out.emit(this.data);
	}
}
