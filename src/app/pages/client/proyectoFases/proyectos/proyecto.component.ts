import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/common/services/pe/proyecto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/common/interfaces/pe.interface';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { CpService } from '../../../../common/services/cp/cp.service';

@Component({
	selector: 'app-proyecto',
	templateUrl: './proyecto.component.html'
})

export class ProyectoComponent implements OnInit {

	fechaFinal: boolean = true;
	limiteFechaInicio: Date;
	limiteFechaFinal: Date;

	presupuesto: any = {
		id_presupuesto: '',
		anio: ''
	};

	proyecto: Proyectos = {
		id: '',
		id_presupuesto: '',
		id_programa: '',
		id_subprograma: '',
		anio: '',
		nombre: '',
		descripcion: '',
		fecha_inicio: null,
		fecha_final: null,
		status: false
	};

	programas: any[];
	subprogramas: any[];

	constructor(
		private proyectoService: ProyectoService,
		private cpService: CpService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService,
		private router: Router
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id_proyecto !== 'nuevo') {
				this.cargarProyecto(data.id);
			}
		});
		this.presupuesto = this.activatedRoute.params
			.subscribe( params => this.presupuesto = params['id_presupuesto']);

		// if (!this.presupuesto) {
		// 	this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}`]);
		// }
		// console.log(this.proyecto.anio = this.fecha.getFullYear());
	}

	ngOnInit() {
		this.getProgramas();
		this.limiteFechaInicio = new Date(`01-01-${this.presupuesto.anio}`);
		this.limiteFechaFinal = new Date(`12-31-${this.presupuesto.anio}`);
	}

	cargarProyecto(id: string) {
		this.proyectoService.getProyecto(id)
			.subscribe((data: any) => {
				this.proyecto = data.data;
				const PROGRAMA = this.proyecto.id_programa;
				const SUBPROGRAMA = this.proyecto.id_subprograma;
				this.getSubprogramaByPrograma(PROGRAMA);
				this.getSubprograma(SUBPROGRAMA);

			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	getProgramas() {
		this.cpService.get_programas()
			.subscribe((data: any) => this.programas = data);
	}

	getSubprogramaByPrograma($id_programa) {
		this.cpService.get_subprogramas($id_programa)
			.subscribe((data: any) => this.subprogramas = data.data);
	}

	getSubprograma($id_subprograma) {
		if ($id_subprograma) {
			this.proyecto.id_subprograma = $id_subprograma;
		}
	}

	activarFechaFinal() {
		this.proyecto.fecha_final = this.limiteFechaInicio;
		this.fechaFinal = false;
	}

	evaluarFechaFinal(data) {
		const fecha = new Date(data);
		if (fecha.getFullYear() !== this.presupuesto.anio) {
			console.log('Error de fecha');
		}
	}
	guardar(f: NgForm) {
		this.proyecto.id_presupuesto = this.presupuesto.id_presupuesto;
		this.proyecto.anio = this.presupuesto.anio;
		console.log(this.proyecto);

		if (f.valid) {
			this.proyectoService.createUpdateProyecto(this.proyecto)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});

			// this.resetVariable();
		}
	}


}
