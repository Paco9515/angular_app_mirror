import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CogService } from 'src/app/services/cog/cog.service';
import { Capitulos, Conceptos } from 'src/app/interfaces/cog.interface';

@Component({
	selector: 'app-cog',
	templateUrl: './cog.component.html',
	styles: []
})
export class CogComponent implements OnInit {

	@Input() primary_keys_cog: any;
	@Output() out = new EventEmitter<any>();

	/* - Variables locales - */
	capitulos: Capitulos[];
	conceptos: Conceptos[];
	partidas: any;
	data: any;

	constructor(
		private cog_service: CogService
	) {
		this.data = {
			id_capitulo: '',
			id_concepto: '',
			id_partida: '',
			id_tipogasto: '',
			id_clas_cont: '',
			codigo_clas_cont: '',
			nombre_clas_cont: '',
			codigo_tipogasto: '',
			nombre_tipogasto: ''
		};
	}

	ngOnInit() {
		this.cog_service.getCapitulos()
			.subscribe((data: any) => this.capitulos = data);

		if (this.primary_keys_cog[0] !== 0) {
			this.getConceptosByCapitulo(this.primary_keys_cog[0]);
			this.getPartidasByConcepto(this.primary_keys_cog[1]);
			this.getDataByPartidas(this.primary_keys_cog[2]);
		}
	}

	getConceptosByCapitulo(id_capitulo: string) {
		// this.data.id_capitulo = id_capitulo;
		// this.data.id_concepto = '';
		// this.data.id_partida = '';
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

	getPartidasByConcepto(id_concepto: string) {
		this.data.id_partida = '';
		this.partidas = [];
		if (id_concepto !== '') {
			this.data.id_concepto = id_concepto;
			this.cog_service.get_partidas_concepto(id_concepto)
				.subscribe((data: any) => {
					this.partidas = data;
					// console.log('CHILD: ', this.partidas);
				});
		}
	}

	getDataByPartidas(id_partida: string) {
		// tslint:disable-next-line:triple-equals
		if (id_partida !== '') {
			const partida_temporal = this.partidas.find(e => e.id == id_partida);

			this.data.id_partida = partida_temporal.id;
			// console.log('AASKGDH: ', partida_temporal);
			this.data.codigo_tipogasto = partida_temporal.codigo_tipogasto;
			this.data.nombre_tipogasto = partida_temporal.nombre_tipogasto;
			this.data.codigo_partida = partida_temporal.codigo;
			this.data.nombre_partida = partida_temporal.nombre;
			if (partida_temporal.codigo_subcuenta === null) {
				this.data.codigo_cuenta = partida_temporal.codigo_cuenta;
				this.data.nombre_cuenta = partida_temporal.nombre_cuenta;
			} else {
				this.data.codigo_cuenta = partida_temporal.codigo_subcuenta;
				this.data.nombre_cuenta = partida_temporal.nombre_subcuenta;
			}


			this.data.id_tgasto = partida_temporal.id_tgasto;
			this.out.emit(this.data);
		} else {
			this.data.id_partida = '';
		}

	}
}
