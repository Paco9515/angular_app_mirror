import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/common/services/pe/proyecto.service';
import { Proyectos } from 'src/app/common/interfaces/pe.interface';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html'
})
export class ProyectosComponent implements OnInit {

	detalle: Proyectos;
	proyectos: Proyectos[];
	presupuesto: string;

	constructor(
		private proyecto_service: ProyectoService,
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
			this.activatedRoute.params.subscribe( params => {
				this.presupuesto = params['id_presupuesto'];
				this.getProyectos(this.presupuesto);
			});
		}

		createProyecto() {
			this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos`, 'nuevo']);
		}

		mostrarFases(id_proyecto) {
			this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos/${id_proyecto}/fases`]);
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
}
