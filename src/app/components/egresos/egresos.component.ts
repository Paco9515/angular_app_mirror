import { Component, ViewChild } from '@angular/core';
import { CogComponent } from '../cog/cog/cog.component';
import { SubprogramaService } from 'src/app/services/cp/subprograma.service';
import { ProgramaService } from '../../services/cp/programa.service';
import { ProyectoService } from '../../services/proyecto/proyecto.service';

@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {

	@ViewChild(CogComponent) cog_component: CogComponent;

	show: boolean;
	mensaje: any;

	partidas: any;
	cantidad: any;
	cog_keys = [0, 0, 0];
	cog_data: any;

	cc_keys = [0, 0, 0];
	cc_data: any;

	ca_keys = [0, 0, 0];
	ca_data: any;

	ui_keys = [0, 0, 0];
	ui_data: any;

	cfg_keys = [0, 0, 0];
	cfg_data: any;

	cff_keys = [0, 0, 0];
	cff_data: any;

	proyectos: any;
	fases: any;

	programas: any;
	subprogramas: any;

	id_sub: any;
	id_fase: any;
	id_gasto: any;

	gastos: any;

	anio: any;
	desc: any;

	constructor(
		private subprograma_service: SubprogramaService,
		private programa_service: ProgramaService,
		private proyecto_service: ProyectoService
	) {

		this.subprograma_service.get_gastos()
			.subscribe((data: any) => {
				this.gastos = data;
			});

		this.id_fase = '';
		this.id_sub = '';
		this.id_gasto = '';

		this.programa_service.getProgramas()
			.subscribe((data: any) => {
				this.programas = data;
			});
		this.proyecto_service.getProyectos()
			.subscribe((data: any) => {
				this.proyectos = data;
			});

		this.show = true;
		this.mensaje = 'Ocultar tabla';
		this.cantidad = 0;
		this.partidas = [];
		this.cog_data = {
			id_capitulo: '',
			id_concepto: '',
			id_partida: '',
			codigo: '',
			nombre: ''
		};
	}

	guardarInfo() {
		const data = {
			id_subprograma: this.id_sub,
			id_fase: this.id_fase,
			id_centro_costo: this.ui_data.id_ctrabajo,
			id_tipo_financ: this.cff_data.id_tipo,
			id_gasto: this.id_gasto,
			anio: this.anio,
			desc: this.desc
		};
		this.proyecto_service.setPresEgreso(data, this.partidas)
			.subscribe((response: any) => {
				console.log(response);
			});
	}

	onChangeProyecto(id_proyecto) {
		if (id_proyecto !== '') {
			this.proyecto_service.getFasesProyecto(id_proyecto)
				.subscribe((data: any) => {
					this.fases = data;
				});
		}
	}

	onChangePrograma(id_programa) {
		if (id_programa !== '') {
			this.subprograma_service.getSubprogramaPRograma(id_programa)
				.subscribe((data: any) => {
					this.subprogramas = data;
				});
		}
	}

	Data_COG(data: any) {
		this.cog_data = data;
		console.log('COG ', data);
	}

	Data_CC(data: any) {
		this.cc_data = data;
		console.log('CC ', data);
	}

	Data_CA(data: any) {
		this.ca_data = data;
		console.log('CA ', data);
	}

	Data_UI(data: any) {
		this.ui_data = data;
		console.log('UI ', data);
	}

	Data_CFG(data: any) {
		this.cff_data = data;
		console.log('CFG ', data);
	}

	Data_CFF(data: any) {
		this.cff_data = data;
		console.log('CFF ', data);
	}

	agregarPartida() {
		this.partidas.push({
			id: this.cog_data.id_partida,
			codigo: this.cog_data.codigo,
			nombre: this.cog_data.nombre,
			importe: this.cantidad
		});
		this.cantidad = 0;
		this.cog_data = {
			id_capitulo: '',
			id_concepto: '',
			id_partida: ''
		};
		this.cog_component.onChangeCapitulo('');
	}

	eliminar(id) {
		console.log('Eliminado: ', id);
	}

}
