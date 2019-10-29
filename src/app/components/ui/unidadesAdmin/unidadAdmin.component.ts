import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UnidadesAdminService } from 'src/app/services/ui/unidadesAdmin.service';
import { MensajesService } from 'src/app/services/shared/mensajes.service';
import { UnidadesAdmin } from 'src/app/interfaces/ui.interface';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'app-unidadAdmin',
	templateUrl: './unidadAdmin.component.html',
	styles: []
})
export class UnidadAdminComponent  {

	id: string;
	unidad: UnidadesAdmin = {
		id: '',
		id_empresa: '',
		codigo: null,
		nombre: '',
		descripcion: '',
		status: true
	};
	emps_unidades = [];
	ult_unidad = [];


	constructor(
		private unidadesService: UnidadesAdminService,
		private activatedRoute: ActivatedRoute,
		private mensajes: MensajesService
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.unidadesService.getUnidadAdmin(this.id)
					.subscribe((obj: any) => {
						this.createForma(obj.data);
					});
			} else {
				this.createForma({
					id: '',
					id_empresa: '',
					codigo: null,
					nombre: '',
					descripcion: '',
					status: true
				});
				this.unidad.id_empresa = '';
			}
		});
	}

	createForma(obj: UnidadesAdmin) {
		// console.log(obj);
		this.unidadesService.getEmpresas().subscribe((empresas: any) => {
			this.emps_unidades = empresas;
		});
		/* this.unidadesService.getUltimaUnidad().subscribe((unidad: any) => {
			 this.unidad.codigo = parseInt(unidad.codigo, 10) + 1;
		}); */
		this.unidad = obj;
	}

	guardar(f: NgForm) {
		console.log(this.unidad);
		if (f.valid) {
			this.unidadesService.createUnidad(this.unidad)
			.subscribe((response: any) => {
				console.log(response);
				this.mensajes.success(response);
			}, error => {
				console.log(error);
				this.mensajes.warning(error.error);
			});
		}
	}
}
