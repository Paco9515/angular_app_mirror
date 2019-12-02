import { Component, ViewChild } from '@angular/core';
import { CogComponent } from '../../../components/classification/clasfObjetoGasto/cog.component';
import { UiComponent } from '../../../components/classification/unidadesInternas/ui.component';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { NgForm } from '@angular/forms';
import { PeService } from 'src/app/common/services/pe/pe.service';
import { CffComponent } from '../../../components/classification/clasfFuenteFinanciamiento/cff.component';
import { ProyectoService } from '../../../common/services/proyecto/proyecto.service';

@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {
	@ViewChild(CogComponent) cog_component: CogComponent;
	@ViewChild(UiComponent) ui_component: UiComponent;
	@ViewChild(CffComponent) cff_component: CffComponent;
	/* -- Clasificación por fuente de financiamiento -- */
	cff_keys = ['0', '0', '0'];
	cff_data: any;
	/* -- Unidades internas | clas administrativa -- */
	ui_keys = ['0', '0'];
	ui_data: any;
	/* -- Clasificación por objeto del gasto -- */
	cog_keys = ['0', '0', '0'];
	cog_data: any;

	/* -- Variables locales -- */
	proyectos: any = [];
	fases: any = [];
	conjuntoDatos: any = [];
	info: any = [];
	partidas: any = [];

	mostrarFormProyecto: boolean = false;
	mostrarFormCffCog: boolean = false;

	total: number = 0;
	importe: number = null;

	id_fase: string;
	nombre_fase: string;
	id_proyecto: string;
	nombre_proyecto: string;
	nombre_tipo: string;

	constructor(
		private mensaje: MensajesService,
		private pe_service: PeService,
		private proyecto_service: ProyectoService
		) {
		this.cog_data = {
			id_capitulo: '',
			id_concepto: '',
			id_partida: '',
			id_cc: '',
			nombre_cc: '',
			nombre_partida: '',
			codigo_partida: '',
			codigo_cuenta: '',
			nombre_cuenta: ''
		};

	}

	/* -- Unidades internas -- */
	getDataUI(data: any) {
		this.id_proyecto = '';
		this.id_fase = '';
		this.proyectos = '';
		this.fases = '';
		this.ui_data = data;
		this.mostrarFormProyecto = false;
		if (this.ui_data.id_ccosto) {
			this.getProyectosByCCosto(this.ui_data.id_ccosto);
		}
	}

	getDataCFF(data: any) {
		this.cff_data = data;
	}

	/* -- Clasificación por objeto de gastos -- */
	getDataCOG(data: any) {
		this.cog_data = data;
	}

	agregarPartida() {
		if (this.importe >= 0) {
			this.total += this.importe;
			this.partidas.push({
				nombre_proyecto: this.nombre_proyecto,
				id_fase: this.id_fase,
				nombre_fase: this.nombre_fase,
				id_partida: this.cog_data.id_partida,
				nombre_partida: this.cog_data.codigo_partida + ' - ' + this.cog_data.nombre_partida   ,
				id_tipo_financ: this.cff_data.id_tipo,
				nombre_tipo_financ: this.cff_data.nombre_tipo,
				importe: this.importe
			});

			this.importe = null;
			this.id_fase = '';
			this.cff_component.restartVariables();
			this.cog_component.restartVariables();

		} else {
			// console.log('La cantidad no puede ser menor o igual a 0.');
		}
		// console.log('Check: ', this.partidas);
	}

	eliminarPartida(id: any, importe: number) {
		this.total -= importe;
		this.partidas.splice(id, 1);
	}

	savePartidasCC() {
		this.conjuntoDatos.push(this.partidas);
		this.total = 0;
		this.importe = 0;
		this.cog_component.restartVariables();
		this.cff_component.restartVariables();
		// console.log('CC_partidas: ', this.cc_partidas);
		this.mostrarPartidas();
	}

	private mostrarPartidas() {
		this.info = [];
		for (const partida of this.conjuntoDatos) {
			for (const item of partida) {
				this.info.push({
					nombre_proyecto: item.nombre_proyecto,
					nombre_fase: item.nombre_fase,
					id_partida: item.id_partida,
					codigo_partida: item.codigo_partida,
					nombre_partida: item.nombre_partida,
					nombre_tipo_financ: item.nombre_tipo_financ,
					importe: item.importe
				});
			}
		}
	}

	/* -- Proyectos de egreso -- */
	getFasesByProyecto(args) {
		this.nombre_proyecto = args.options[args.selectedIndex].innerText;
		this.id_fase = '';
		this.mostrarFormCffCog = false;
		if (args.value !== '') {
			this.pe_service.get_fases(args.value)
			.subscribe((data: any) => {
					this.id_proyecto = args.value;
					this.fases = data.data;
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}

	getFase(args) {
		this.nombre_fase = args.options[args.selectedIndex].innerText;
		if (this.mostrarFormProyecto) {
			this.mostrarFormCffCog = true;
		}
	}

	getProyectosByCCosto(id_ccosto) {
		this.pe_service.get_proyectos_ccostos(id_ccosto)
		.subscribe((data: any) => {
			this.proyectos = data.data;
			this.mostrarFormProyecto = true;

		},
		error => {
			this.mensaje.warning(error.error);
			this.mostrarFormProyecto = false;
		});
	}

	guardarInfo() {// f: NgForm) {
		// console.log(f);
		// if ( f.valid) {

			this.proyecto_service.postPresEgreso(this.conjuntoDatos)
				.subscribe(( data: any) => {
					this.partidas = '';
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		// // }
	}



}
