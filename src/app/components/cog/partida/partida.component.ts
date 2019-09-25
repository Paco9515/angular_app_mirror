import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PartidaService } from 'src/app/services/cog/partida.service';
import { Conceptos, Partidas, Capitulos } from 'src/app/interfaces/cog.interface';
import { Grupos, Generos, Rubros, Cuentas, Subcuentas } from '../../../interfaces/cc.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-partida',
    templateUrl: './partida.component.html',
    styles: []
})
export class PartidaComponent implements OnInit{

	capitulos: Capitulos[];
    conceptos: Conceptos[];
    partidas: Partidas[];
	partida: Partidas;

	subcuentas: Subcuentas;
	cuentas: Cuentas;
	rubros: Rubros;
	grupos: Grupos;
	generos: Generos;
	sub: boolean = true;

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
			nombre_concepto: '',
			//Clasificacion contable
			id_genero: '',
			id_grupo: '',
			id_rubro: '',
			id_cuenta: '',
			id_subcuenta: '',
		};

		/*this.partidaService.getCapitulos().subscribe((data: Capitulos) => {
			this.capitulos = data;
		});

		this.partidaService.getConceptos().subscribe((data: Conceptos) => {
			this.conceptos = data;
		});

		this.partidaService.getGeneros().subscribe((data: Generos) => {
			this.generos = data;
		});

		this.partidaService.getGrupos().subscribe((obj: Grupos) => {
			this.grupos = obj;
		});

		this.partidaService.getRubros().subscribe((obj: Rubros) => {
			this.rubros = obj;
		});

		this.partidaService.getCuentas().subscribe((obj: Cuentas) => {
			this.cuentas = obj;
		});

		this.partidaService.getSubcuentas().subscribe((obj: Subcuentas) => {
			this.subcuentas = obj;
		});*/
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
		if (id_capitulo !== '') {
			this.partida.id_capitulo = id_capitulo;
			this.partidaService.get_conceptos_capitulo(id_capitulo)
				.subscribe((data: any) => {
					this.conceptos = data;
				});
		}
	}

	onChangeConcepto(id_concepto) {
		this.partida.id_concepto = id_concepto;
	}

	cargarPartida(id: string) {
		this.partidaService.getPartidaId(id)
			.subscribe((obj: Partidas) => {
			this.partida = obj;
			const CONCEPTO = this.partida.id_concepto;
			this.onChangeCapitulo(this.partida.id_capitulo);
			this.onChangeConcepto(CONCEPTO);
		});
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
