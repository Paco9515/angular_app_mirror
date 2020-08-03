import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/common/services/pe/proyecto.service';
import { Proyectos } from 'src/app/common/interfaces/pe.interface';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FaseService } from '../../../../common/services/pe/fase.service';
import { estadosEgresos } from '../../../../constants/estadosEgresos';

@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html'
})
export class ProyectosComponent implements OnInit {

	estado = estadosEgresos;
	detalle: Proyectos;
	proyectos: Proyectos[];
	fases: any;
	estadoEgreso: any = '';
	id_presupuesto: any;
	total = 0;
	bandera: boolean;

	constructor(
		private proyecto_service: ProyectoService,
		private fase_service: FaseService,
		private mensaje: MensajesService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
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
				estado: '',
				deleted: false
			};
			this.proyectos = [];
	}

	ngOnInit() {
		// console.log(estadosPresupuestoEgresos.CAPTURANDO );

		this.activatedRoute.params
			.subscribe( params => {
				(typeof params['bandera'] !== 'undefined')? this.bandera = true : this.bandera =  false;
				// console.log(this.bandera);
				this.id_presupuesto = params['id_presupuesto'];
				this.getProyectos(this.id_presupuesto);
			});
		
	}

	createProyecto() {
		if (!this.bandera) {
			this.router.navigate([`/panel-adm/pres_egresos/${this.id_presupuesto}/proyectos`, 'nuevo']);
		} else {
			this.router.navigate([`/panel-adm/mod_proyecto/${this.id_presupuesto}/proyectos/`, `nuevo`, this.bandera]);
		}
	}

	mostrarFases(id_proyecto) {
		if (!this.bandera) {
			this.router.navigate([`/panel-adm/pres_egresos/${this.id_presupuesto}/proyectos/${id_proyecto}/fases`]);
		} else {
			this.router.navigate([`/panel-adm/mod_fases/${this.id_presupuesto}/proyectos/${id_proyecto}/fases`, this.bandera]);
		}
	}

	getProyectos($id_presupuesto: string) {
		// console.log('getProyecto');
		// console.log('bandera', this.bandera);
		if(this.bandera == true) {
			// console.log('getProyecto bandera true');
			this.proyecto_service.getProyectosCursando($id_presupuesto)
			.subscribe((data: any) => {
				this.proyectos = data[0];
				this.estadoEgreso = data[1];
				this.estadoEgreso =  this.estadoEgreso.estado;
			});
		} else {
			// console.log('getProyecto bandera false');
			this.proyecto_service.getProyectos($id_presupuesto)
			.subscribe((data: any) => {
				this.proyectos = data[0];
				this.estadoEgreso = data[1];
				this.estadoEgreso =  this.estadoEgreso.estado;
			});
		}
		
	}

	eliminarActivar(id: string, type: boolean) {
		console.log([['id', id],['type', type]]);
		this.proyecto_service.activarEliminarProyecto(id, type)
		.subscribe((data: any) => {
			console.log('proy_serv', data);
			this.getProyectos(this.id_presupuesto);
			this.mensaje.success(data);
		}, error => {
			this.mensaje.danger(error.error);
		});
	}

	// editar normal
	editar(proyecto) {
		if (!this.bandera) {
			this.router.navigate([`/panel-adm/pres_egresos/${this.id_presupuesto}/proyectos`, proyecto]);
		} else {
			this.router.navigate([`/panel-adm/mod_proyecto/${this.id_presupuesto}/proyectos`, proyecto, this.bandera]);
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
			.subscribe( (fases: any) => {
				this.fases = fases.data;
				// console.log(this.fases);
				if (this.fases) {
					this.fases.forEach(function(fase: any) {
						fase.importe = 0;
						fase.importe = fase.partidas.reduce((sum, partida) => sum + Number(partida.importe), fase.importe);
						this.total = this.total + Number(fase.importe);
					}, this);
				}
			});
	}
}
