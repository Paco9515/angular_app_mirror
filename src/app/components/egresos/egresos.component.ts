import { Component, ViewChild } from '@angular/core';
import { CogComponent } from '../cog/cog/cog.component';
import { SubprogramaService } from 'src/app/services/cp/subprograma.service';
import { ProgramaService } from '../../services/cp/programa.service';
import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { UiComponent } from '../ui/ui/ui.component';

@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {

	@ViewChild(CogComponent) cog_component: CogComponent;
	@ViewChild(UiComponent) ui_component: UiComponent;

	/* -- Clasificación programatica -- */
	programas: any;
	subprogramas: any;

	/* -- Proyectos de egreso -- */
	proyectos: any;
	fases: any;

	/* -- Clasificación por fuente de financiamiento -- */
	cff_keys = [0, 0, 0];
	cff_data: any;

	/* -- Clasificación por objeto del gasto -- */
	cog_keys = [0, 0, 0];
	cog_data: any;

	/* -- Unidades internas -- */
	ui_keys = [0, 0, 0];
	ui_data: any;

	/* -- Variables locales -- */
	cc_partidas: any;

	// show: boolean;
	// mensaje: any;
	total: number;

	partidas: any;
	cantidad: any;

	cfg_keys = [0, 0, 0];
	cfg_data: any;

	id_subprograma: any;
	id_fase: any;
	id_gasto: any;

	// gastos: any;

	anio: any;
	desc: any;

	constructor(
		private subprograma_service: SubprogramaService,
		private programa_service: ProgramaService,
		private proyecto_service: ProyectoService
	) {
		/* -- Clasificación programática -- */
		this.programa_service.getProgramas()
			.subscribe((data: any) => {
				this.programas = data;
			});
		this.id_subprograma = '';

		/* -- Proyectos de egreso -- */
		this.proyecto_service.getProyectos()
			.subscribe((data: any) => {
				this.proyectos = data;
			});
		this.id_fase = '';

		this.total = 0;
		// this.subprograma_service.get_gastos()
		// 	.subscribe((data: any) => {
		// 		this.gastos = data;
		// 	});

		/* -- Variables locales -- */
		this.cc_partidas = [];


		this.id_gasto = '';

		// this.show = true;
		// this.mensaje = 'Ocultar tabla';
		this.cantidad = 0;
		this.partidas = [];
		this.cog_data = {
			id_capitulo: '',
			id_concepto: '',
			id_partida: '',
			nombre_partida: '',
			codigo_partida: '',
			codigo_cuenta: '',
			nombre_cuenta: ''
		};
	}

	/* -- Clasificación programática -- */
	getSubprogramasByPrograma(id_programa: string) {
		this.id_subprograma = '';
		if (id_programa !== '') {
			this.subprograma_service.getSubprogramaPRograma(id_programa)
				.subscribe((data: any) => {
					this.subprogramas = data;
				});
		}
	}

	/* -- Proyectos de egreso -- */
	getFasesByProyecto(id_proyecto: string) {
		this.id_fase = '';
		if (id_proyecto !== '') {
			this.proyecto_service.getFasesProyecto(id_proyecto)
				.subscribe((data: any) => {
					this.fases = data;
				});
		}
	}

	/* -- Clasificación por fuente de financiamiento -- */
	getDataCFF(data: any) {
		this.cff_data = data;
		console.log('CFF: ', data);
	}

	/* -- Unidades internas -- */
	getDataUI(data: any) {
		this.ui_data = data;
		console.log('UI: ', data);
	}

	/* -- Clasificación por objeto de gastos -- */
	getDataCOG(data: any) {
		this.cog_data = data;
		console.log('COG: ', data);
	}

	guardarInfo() {
		const data = {
			id_subprograma: this.id_subprograma,
			id_fase: this.id_fase,
			id_centro_costo: this.ui_data.id_ccosto,
			id_tipo_financ: this.cff_data.id_tipo,
			id_gasto: this.cog_data.id_tgasto,
			desc: this.desc
		};
		console.log('data:', data);
		console.log('partidas:', this.partidas);
		this.proyecto_service.setPresEgreso(data, this.partidas)
			.subscribe((response: any) => {
				console.log(response);
			});
	}

	agregarPartida() {
		this.total += this.cantidad;
		this.partidas.push({
			id_partida: this.cog_data.id_partida,
			codigo_partida: this.cog_data.codigo_partida,
			nombre_partida: this.cog_data.nombre_partida,
			importe: this.cantidad
		});
		this.cantidad = 0;
		// this.cog_data = {
		// 	id_partida: '',
		// 	nombre_partida: '',
		// 	codigo_partida: '',
		// 	codigo_cuenta: '',
		// 	nombre_cuenta: ''
		// };
		// this.cog_component.onChangePartida('');
	}

	eliminarPartida(id: any, importe: number) {
		this.total -= importe;
		this.partidas.splice(id, 1);
	}

	// Data_CC(data: any) {
	// 	this.cc_data = data;
	// 	console.log('CC ', data);
	// }

	// Data_CA(data: any) {
	// 	this.ca_data = data;
	// 	console.log('CA ', data);
	// }

	// Data_CFG(data: any) {
	// 	this.cff_data = data;
	// 	console.log('CFG ', data);
	// }

	savePartidasCC() {
		this.cc_partidas.push(this.partidas);
		this.partidas = [];
		this.total = 0;
		// this.cog_component.onChangeCapitulo('');
		this.ui_component.getCcByUnidad('');
		console.log('CC_partidas: ', this.cc_partidas);
	}

}
