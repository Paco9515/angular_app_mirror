import { Component } from '@angular/core';
import { ProyectoService } from 'src/app/common/services/pe/proyecto.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/common/interfaces/pe.interface';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { UiService } from '../../../../common/services/ui/ui.service';
import { CpService } from '../../../../common/services/cp/cp.service';

@Component({
	selector: 'app-proyecto',
	templateUrl: './proyecto.component.html'
})

export class ProyectoComponent {
	proyecto: Proyectos = {
		id: '',
		id_unidad_admin: '',
		id_centro_costo: '',
		id_programa: '',
		id_subprograma: '',
		codigo: '',
		nombre: '',
		descripcion: '',
		anio: null,
		fecha_inicio: null,
		fecha_final: null,
		status: false
	};

	direccion: any = {
		codigo_postal: '',
		municipio: '',
		estado: '',
		colonias: []
	};
	colonia = '';

	udsAdministrativas: any[];
	ctrCostos: any[];
	programas: any[];
	subprogramas: any[];

	constructor(
		private proyectoService: ProyectoService,
		private uiService: UiService,
		private cpService: CpService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService
	) {


		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarProyecto(data.id);
			}
		});

		this.getUdsAdministrativas();
		this.getProgramas();

	}

	cargarProyecto(id: string) {
		this.proyectoService.getProyecto(id)
			.subscribe((data: any) => {
				this.proyecto = data.data;
				const ADMIN = this.proyecto.id_unidad_admin;
				const CCOSTO = this.proyecto.id_centro_costo;
				const PROGRAMA = this.proyecto.id_programa;
				const SUBPROGRAMA = this.proyecto.id_subprograma;
				this.getCCostoByUdsAdmin(ADMIN);
				this.getCCosto(CCOSTO);
				this.getSubprogramaByPrograma(PROGRAMA);
				this.getSubprograma(SUBPROGRAMA);

			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	getUdsAdministrativas() {
		this.uiService.getUnidadesAdmin()
			.subscribe((data: any) => {
				this.udsAdministrativas = data;
			});
	}

	getCCostoByUdsAdmin($id_uds_admin) {
		this.ctrCostos = [];
		if ($id_uds_admin) {
			this.uiService.getCcByUnidad($id_uds_admin)
			.subscribe((data: any) => this.ctrCostos = data);
		}
	}

	getCCosto($id_ccosto) {
		if ($id_ccosto) {
			this.proyecto.id_centro_costo = $id_ccosto;
		}
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

	guardar(f: NgForm) {
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
