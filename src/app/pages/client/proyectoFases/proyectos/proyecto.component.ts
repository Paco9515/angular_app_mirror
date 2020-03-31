import { Component } from '@angular/core';
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

export class ProyectoComponent {

	fechaFinal: boolean = true;
	limiteFechaInicio: any;
	limiteFechaFinal: any;
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
		estado: ''
	};

	proyecto_original: any;

	programas: any[];
	subprogramas: any[];
	bandera: boolean = false;
	id_proyecto: string ;

	constructor(
		private proyectoService: ProyectoService,
		private cpService: CpService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService,
		private router: Router,
		private egresos: PresupuestoEgresoService
	) {
		
		this.activatedRoute.params.subscribe((params: any) => {
			
			// Comprobar la existencia del parametro bandera
			(typeof params['bandera'] !== 'undefined')? this.bandera = params['bandera'] : this.bandera =  false;

			if (params.id_proyecto !== 'nuevo') {
				// Carga del proyecto a editar proyecto
				this.id_proyecto = params.id_proyecto;
				this.cargarProyecto(this.id_proyecto);
			} else {
				// Iniciar variables para creacion de proyecto nuevo
				this.proyecto.id_presupuesto = params['id_presupuesto'];
				// console.log(params['id_presupuesto']);
				this.egresos.get_presupuestoId(params['id_presupuesto'])
					.subscribe((data: any) => {
						this.anioEgreso =  data.data.anio;
						this.limiteFechaInicio = new Date(`${this.anioEgreso}-01-01`).toISOString().split('T')[0];
						// console.log(this.limiteFechaInicio);
						this.limiteFechaFinal = new Date(`${this.anioEgreso}-12-31`).toISOString().split('T')[0];
						// console.log(this.limiteFechaFinal);
					});
			}
		});
		this.getProgramas();
		// console.log(this.bandera);
	}

	cargarProyecto(id: string) {
		// console.log('entre a cargar proyecto');
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


	// Obtener todos los programas
	getProgramas() {
		this.cpService.get_programas()
			.subscribe((data: any) => this.programas = data);
	}

	// Obtener subprogramas pertenecientes a un programa
	getSubprogramaByPrograma($id_programa) {
		this.cpService.get_subprogramas($id_programa)
			.subscribe((data: any) => this.subprogramas = data.data);
	}

	// Asignacion de i_programa a el objeto proyecto
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
		// console.log(this.proyecto.id);
		if (f.valid) {
			if (this.bandera && this.proyecto.id !== '') {
				// console.log('entro en la bandera');
				this.proyectoService.createUpdateProyecto2(this.proyecto_original)
					.subscribe((data: any) => {
						// console.log(data);
					}, error => {
						this.mensaje.danger(error.error);
					});
			}

			this.proyectoService.createUpdateProyecto(this.proyecto)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});


			// this.resetVariable();

		}
	}

	// Regresar normal
	regresar() {
		this.router.navigate([`/panel-adm/pres_egresos/${this.proyecto.id_presupuesto}/proyectos`]);
	}

	// Regresar a proyectos modificar egreso
	mod_regresar() {
		const bandera = true;
		this.router.navigate([`/panel-adm/mod_proyectos/${this.proyecto.id_presupuesto}/proyectos/${bandera}`]);
	}

}
