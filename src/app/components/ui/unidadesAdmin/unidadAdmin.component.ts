import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UnidadesAdminService } from 'src/app/services/ui/unidadesAdmin.service';
import { UnidadesAdmin } from 'src/app/interfaces/ui.interface';

@Component({
	selector: 'app-unidadAdmin',
	templateUrl: './unidadAdmin.component.html',
	styles: []
})
export class UnidadAdminComponent  {

	id: string;
	unidad: UnidadesAdmin = {
		id: '',
		id_empresa: '',
		codigo: '',
		nombre: '',
		desc: '',
		status: true
	};
	emps_unidades = [];
	ult_unidad = [];


	constructor(
		private unidadesService: UnidadesAdminService,
		private activatedRoute: ActivatedRoute,
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.unidadesService.getUnidadAdmin(this.id)
					.subscribe((obj: UnidadesAdmin) => {
						this.createForma(obj);
					});
			} else {
				this.createForma({
					id: '',
					id_empresa: '',
					codigo: null,
					nombre: '',
					desc: '',
					status: true
				});
				this.unidad.id_empresa = '';
			}
		});
	}

	createForma(obj: UnidadesAdmin) {

		this.unidadesService.getEmpresas().subscribe((empresas: any) => {
			this.emps_unidades = empresas;
		});
		this.unidadesService.getUltimaUnidad().subscribe((unidad: any) => {
			 //this.unidad.codigo = parseInt(unidad.codigo, 10) + 1;
		});
		this.unidad = obj;
	}


	guardar(f: NgForm) {
		if (f.valid) {
			this.unidadesService.createUnidad(this.unidad)
			.subscribe((response: any) => {
				if (response.mensaje === 'creado') {
					console.log('Empresa creada con exito.');
				} else {
					console.log('Empresa editada con exito.');
				}
			});
		}
		// console.log(this.unidad);
	}
}
