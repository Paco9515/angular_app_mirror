import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/common/interfaces/pe.interface';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { ProyectoService } from 'src/app/common/services/pe/proyecto.service';
import { CpService } from '../../../../common/services/cp/cp.service';
import { PresupuestoEgresoService } from '../../../../common/services/presupuesto/egreso.service';

@Component({
	selector: 'app-proyecto',
	templateUrl: './proyecto.component.html'
})

export class ProyectoComponent implements OnInit {

	fechaFinal: boolean = true;
	limiteFechaInicio: Date;
	limiteFechaFinal: Date;
	anioEgreso: string;

	proyecto: Proyectos = {
		id: '',
		id_presupuesto: '',
		id_programa: '',
		id_subprograma: '',
		nombre: '',
		descripcion: '',
		anio: '',
		fecha_inicio: null,
		fecha_final: null,
		status: false
	};

	proyecto_original: any;

	programas: any[];
	subprogramas: any[];
	bandera: boolean;
	id_proyecto: string ;

	constructor(
		private proyectoService: ProyectoService,
		private cpService: CpService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService,
		private router: Router,
		private egresos: PresupuestoEgresoService
	) {

		this.bandera = false;
		this.activatedRoute.params.subscribe((params: any) => {
			if (params.id_proyecto !== 'nuevo') {
				this.bandera = params['bandera'];
				this.id_proyecto = params.id_proyecto;
				this.cargarProyecto(params.id_proyecto);
			}

			this.proyecto.id_presupuesto = params['id_presupuesto'];
			this.bandera = params['bandera'];
			this.egresos.get_presupuesto(this.proyecto.id_presupuesto)
				.subscribe((data: any) => {
					this.anioEgreso =  data.data.anio;
					this.limiteFechaInicio = new Date(`01-01-${this.anioEgreso}`);
					this.limiteFechaFinal = new Date(`12-31-${this.anioEgreso}`);
				});
		});
		this.getProgramas();
	}

	ngOnInit() {
	}

	cargarProyecto(id: string) {
		this.proyecto_original = [];
		this.proyectoService.getProyecto(id)
			.subscribe((data: any) => {
				this.proyecto_original = data.data;
				// console.log(this.proyecto_original);
			});
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

	guardar(f: NgForm) {
		this.proyecto.anio = this.anioEgreso;
		if (f.valid) {
			if (this.bandera) {
				this.proyectoService.createUpdateProyecto2(this.proyecto, this.proyecto_original)
					.subscribe((data: any) => {
					}, error => {
						this.mensaje.danger(error.error);
					});
				this.proyectoService.createUpdateProyecto(this.proyecto)
					.subscribe((data: any) => {
						this.mensaje.success(data);
					}, error => {
						this.mensaje.danger(error.error);
					});
			} else {
				this.proyectoService.createUpdateProyecto(this.proyecto)
					.subscribe((data: any) => {
						this.mensaje.success(data);
					}, error => {
						this.mensaje.danger(error.error);
					});
			}

			// this.resetVariable();
			this.cargarProyecto(this.id_proyecto);
		}
	}

	// REgresar normal
	regresar() {
		this.router.navigate([`/panel-adm/pres_egresos/${this.proyecto.id_presupuesto}/proyectos`]);
	}

	// Regresar a proyectos modificar egreso
	mod_regresar() {
		const bandera = true;
		this.router.navigate([`/panel-adm/mod_proyectos/${this.proyecto.id_presupuesto}/proyectos/${bandera}`]);
	}

}
