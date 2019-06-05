import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';
import { UnidadesAdminService } from "src/app/services/ui/unidadesAdmin.service";
import { UnidadesAdmin } from "src/app/interfaces/ui.interface";

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
	emps_unidades=[];
	
	// programa: Programas;

	constructor(
		private unidadesService: UnidadesAdminService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		//private toastrService: ToastrService
	) {
		//console.log('1');
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.unidadesService.getUnidadAdmin(this.id)
					.subscribe((obj: UnidadesAdmin) => {
						this.createForma(obj);
						//this.unidad = obj;
						//console.log('2');

						//console.log(obj);

					});
			} else {
				this.createForma({
					id: '',
					id_empresa: '1',
					codigo: '',
					nombre: '',
					desc: '',
					status: true
				});
				// this.programa = {nombre: '', status: true};
			}
		});
		//console.log('3');
	}

	createForma(obj: UnidadesAdmin) {
		
		this.unidadesService.getEmpresas().subscribe((empresas: any) => {
			this.emps_unidades = empresas;
			//console.log('unidades por id',this.emps_unidades);
		});
		this.unidad = obj;			
	}


	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');		
				
		this.unidadesService.createUnidad(this.unidad)
			.subscribe((response: any) => {
				if (response.message === 'creada') {
					console.log('Empresa creada con exito.');
				} else {
					console.log('Empresa editada con exito.');
				}
			});
		//console.log(rr);
	}

}
