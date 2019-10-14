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

	/* -- Proyectos y fases -- */
	proyectos: any;
	fases: any;

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
	cc_partidas: any;
	partidas: any;
	total: number;
	cantidad: any;

	/* -- VARIABLES A ELIMINAR | PROYECTOS Y FASE, PROGRAMA Y SUPBRPGRAMA */

	id_subprograma: any;
	id_fase: any;

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


		// this.id_gasto = '';
		// this.show = true;
		// this.mensaje = 'Ocultar tabla';
		this.cantidad = 0;
		this.partidas = [];
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

	agregarPartida() {
		if (this.cantidad >= 0) {
			this.total += this.cantidad;
			this.partidas.push({
				id_cc: this.ui_data.id_ccosto,
				nombre_cc: this.ui_data.nombre_cc,
				id_partida: this.cog_data.id_partida,
				codigo_partida: this.cog_data.codigo_partida,
				nombre_partida: this.cog_data.nombre_partida,
				importe: this.cantidad
			});
			this.cantidad = 0;
			this.cog_component.getPartidasByConcepto('');
		} else {
			console.log('La cantidad no puede ser menor o igual a 0.');
		}
		console.log('Check: ', this.cog_data);
	}

	eliminarPartida(id: any, importe: number) {
		this.total -= importe;
		this.partidas.splice(id, 1);
	}

	savePartidasCC() {
		this.cc_partidas.push(this.partidas);
		this.partidas = [];
		this.total = 0;
		this.cog_component.restartVariables();
		this.ui_component.restartVariables();
		console.log('CC_partidas: ', this.cc_partidas);
	}

	guardarInfo() {
		const data = {
			id_subprograma: this.id_subprograma,
			id_fase: this.id_fase,
			id_centro_costo: this.ui_data.id_ccosto,
			id_tipo_financ: this.cff_data.id_tipo,
			id_gasto: this.cog_data.id_tipogasto
		};
		console.log('data:', data);
		console.log('partidas:', this.partidas);
		this.proyecto_service.setPresEgreso(data, this.partidas)
			.subscribe((response: any) => {
				console.log(response);
			});
	}

}
