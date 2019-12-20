import { Component, OnInit } from '@angular/core';
import { FaseService } from 'src/app/common/services/pe/fase.service';
import { Fases } from 'src/app/common/interfaces/pe.interface';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PartidaFase } from '../../../../common/interfaces/pe.interface';

@Component({
	selector: 'app-fases',
	templateUrl: './fases.component.html'
})
export class FasesComponent implements OnInit {

	fases: Fases[];
	proyecto: string;
	presupuesto: string;

	detalle: Fases;
	partidas: any[];

	total = 0;
	geografia: any = {
		cp: '',
		entidad: '',
		municipio: '',
		colonia: '',
		domicilio: ''
	};

	constructor(
		private fase_service: FaseService,
		private mensaje: MensajesService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.fases = [];
		this.detalle = {
			id: '',
			id_proyecto: '',
			codigo_proyecto: '',
			nombre_proyecto: '',
			nombre_tipo_financ: '',
			codigo: '',
			nombre: '',
			descripcion: '',
			externo: null,
			status: false,
			geografia: null,
			partidas: null
		};
	}

	ngOnInit() {
		this.activatedRoute.params
			.subscribe( params => {
				this.proyecto = params['id_proyecto'];
				this.presupuesto = params['id_presupuesto'];
			});
		this.getFases(this.proyecto);
	}

	createFase() {
		this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos/${this.proyecto}/fases`, 'nuevo']);
	}

	getFases(id_proyecto) {
		this.fase_service.getFases(id_proyecto)
			.subscribe((data: any) => this.fases = data);
	}

	eliminarActivar(id: string, type: boolean) {
		this.fase_service.activarEliminarFase(id, type)
			.subscribe((data: any) => {
				this.getFases(this.proyecto);
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	editar(fase) {
		this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos/${this.proyecto}/fases`, fase]);
	}

	regresar() {
		this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos`]);
	}

	mostrarDetalle( fase ) {
		this.detalle = fase;
		this.detalle.partidas.forEach(function(partida) {
			this.total = this.total + partida.importe;
		}, this);
		this.geografia = this.detalle.geografia[0];

	}
}
