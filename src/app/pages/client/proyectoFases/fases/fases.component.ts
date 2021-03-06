import { Component, OnInit } from '@angular/core';
import { FaseService } from 'src/app/common/services/pe/fase.service';
import { Fase } from 'src/app/common/interfaces/pe.interface';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../../../common/services/proyecto/proyecto.service';
import { estadosProyecto } from 'src/app/constants/estadoProyecto';

@Component({
	selector: 'app-fases',
	templateUrl: './fases.component.html'
})
export class FasesComponent implements OnInit {

	fases: Fase[];
	fase: Fase;
	proyecto: string;
	presupuesto: any[];
	estadoProyecto = '';
	partidas: any[];
	bandera: boolean;
	estado = estadosProyecto;

	total = 0;

	constructor(
		private fase_service: FaseService,
		private proyectos_service: ProyectoService,
		private mensaje: MensajesService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.fases = [];
		this.fase = {
			id: '',
			id_proyecto: '',
			estado_proyecto: '',
			id_tipo_financ: '',
			codigo: '',
			nombre: '',
			descripcion: '',
			externo: false,
			codigo_postal: '',
			estado: '',
			municipio: '',
			id_ubicacion_geografica: '',
			asentamiento: '',
			tipo_asentamiento: '',
			zona_asentamiento: '',
			calle: '',
			num_exterior: null,
			num_interior: null,
			deleted: false,
			partidas: []
		}

		this.bandera = false;
	}

	ngOnInit() {

		this.activatedRoute.params
			.subscribe( params => {
				(typeof params.bandera !== 'undefined') ? this.bandera = params.bandera : this.bandera =  false;

				this.proyecto = params.id_proyecto;
				this.presupuesto = params.id_presupuesto;
				this.getEstadoProyecto(this.proyecto);
			});
			// console.log(this.bandera);
		this.getFases(this.proyecto);
	}

	/* Funcion que valida si esta en el apartado de crear egreso o modificar egreso */
	createFase() {
		if (!this.bandera) {
			this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos/${this.proyecto}/fases`, 'nuevo']);
		} else {
			this.router.navigate([`/panel-adm/mod_fase/${this.presupuesto}/proyectos/${this.proyecto}/fases`, 'nuevo', 'true']);
		}
	}

	getFases(id_proyecto) {
		this.fase_service.getFases(id_proyecto)
			.subscribe((data: any) => {
				this.fases = data.data;
				// Se consulta el estado del proyecto de la primera fase
				this.estadoProyecto = this.fases[0].estado_proyecto;
			});
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
		if (!this.bandera) {
			this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos/${this.proyecto}/fases`, fase]);
		} else {
			this.router.navigate([`/panel-adm/mod_fase/${this.presupuesto}/proyectos/${this.proyecto}/fases`, fase, this.bandera]);
		}
	}

	/* Funcion que valida a donde debe regresar dependiendo si esta creando un egreso o modificandolo */
	regresar() {
		console.log('Bandera:', this.bandera);
		if (!this.bandera) {
			// console.log(false);
			this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos`]);
		} else {
			// console.log(true);
			this.router.navigate([`/panel-adm/mod_proyectos/${this.presupuesto}/proyectos/`, this.bandera]);
		}
	}

	mostrarDetalle(fase) {
		this.fase = fase;
	}

	getEstadoProyecto(id) {
		this.proyectos_service.getProyecto(id)
			.subscribe((data: any) => {
				this.estadoProyecto = data.estado;
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}

