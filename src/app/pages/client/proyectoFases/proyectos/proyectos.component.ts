import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/common/services/pe/proyecto.service';
import { Proyectos } from 'src/app/common/interfaces/pe.interface';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FaseService } from '../../../../common/services/pe/fase.service';

@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html'
})
export class ProyectosComponent implements OnInit {

	detalle: Proyectos;
	proyectos: Proyectos[];
	fases: any;
	presupuesto: string;
	total = 0;
	bandera: boolean;

	constructor(
		private proyecto_service: ProyectoService,
		private fase_service: FaseService,
		private mensaje: MensajesService,
		private activatedRoute: ActivatedRoute,
		private router: Router
		) {
			this.detalle = {
				id: '',
				id_presupuesto: '',
				id_subprograma: '',
				codigo: '',
				nombre: '',
				descripcion: '',
				fecha_inicio: null,
				fecha_final: null,
				codigo_subprograma: '',
				nombre_subprograma: '',
				codigo_programa: '',
				nombre_programa: '',
				status: false
			};
			// console.log(navigation);
			this.proyectos = [];
	}

	ngOnInit() {
		this.bandera = false;
		this.activatedRoute.params.subscribe( params => {
			this.presupuesto = params['id_presupuesto'];
			this.bandera = params['bandera'];
			// console.log(this.bandera);
			this.getProyectos(this.presupuesto);
		});
	}

	createProyecto() {
		if (!this.bandera) {
			this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos`, 'nuevo']);
		} else {
			this.router.navigate([`/panel-adm/mod_proyecto/${this.presupuesto}/proyectos/`, `nuevo`, this.bandera]);
		}
	}

	mostrarFases(id_proyecto) {
		if (!this.bandera) {
			this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos/${id_proyecto}/fases`]);
		} else {
			this.router.navigate([`/panel-adm/mod_fases/${this.presupuesto}/proyectos/${id_proyecto}/fases`, this.bandera]);
		}
	}

	getProyectos($id_presupuesto) {
		this.proyecto_service.getProyectos($id_presupuesto)
		.subscribe((data: any) => this.proyectos = data);
	}

	eliminarActivar(id: string, type: boolean) {
		this.proyecto_service.activarEliminarProyecto(id, type)
		.subscribe((data: any) => {
			this.getProyectos(this.presupuesto);
			this.mensaje.success(data);
		}, error => {
			this.mensaje.danger(error.error);
		});
	}

	// editar normal
	editar(proyecto) {
		if (!this.bandera) {
			this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos`, proyecto]);
		} else {
			this.router.navigate([`/panel-adm/mod_proyecto/${this.presupuesto}/proyectos`, proyecto, this.bandera]);
		}
	}

	regresar() {
		if (!this.bandera) {
			this.router.navigate([`/panel-adm/pres_egresos`]);
		} else {
			this.router.navigate([`/panel-adm/modificar_egreso`]);
		}
	}

	mostrarDetalle(proyecto) {
		this.detalle = proyecto;
		this.total = 0;
		this.fase_service.getFases(proyecto.id)
			.subscribe( (data: any) => {
				this.fases = data;
				if (this.fases !== []) {
					this.fases.forEach(function(fase) {
						fase.importe = 0;
						fase.partidas.forEach(function(partida) {
							fase.importe += partida.importe;
						});
						this.total += fase.importe;
					}, this);
				}
			});
	}
}
