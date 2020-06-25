import { Component, OnInit } from '@angular/core';
import { UnidadesAdminService } from 'src/app/common/services/ui/unidadesAdmin.service';
import { UnidadesAdmin } from 'src/app/common/interfaces/ui.interface';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-unidadesAdmin',
  templateUrl: './unidadesAdmin.component.html',
  styles: []
})
export class UnidadesAdminComponent {

  unidades: UnidadesAdmin[];
  detalle: any;
  user: any;
  nivel: any;
  banderaAdmin: boolean;
  empresas: any;

  constructor(
		private unidad_service: UnidadesAdminService,
		private empresaService: EmpresaService,
		private mensajes: MensajesService
	) {
		this.unidades = [];
		this.detalle = {
			id: '',
			id_empresa: '',
			id_clas_admin: '',
			nom_clas_admin: '',
			nom_emp: '',
			codigo: '',
			nombre: '',
			desc: '',
			status: true
		};
		this.nivel = null;    
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.user = user;
		this.nivel = user.id_nivel;

		if (this.nivel != null) {
				this.banderaAdmin = false;	
				this.getUnidades(user.id_empresa);					
		} else {
			this.banderaAdmin = true;	
			this.empresaService.getEmpresas().subscribe((data: any) => {
				this.empresas = data;
				// console.log('empresas' ,this.empresas);
				this.getUnidades(this.empresas[0].id);
			});		
		} 		
	}

  getUnidades(id_empresa: string) {
		this.unidad_service.getUnidadesAdmin(id_empresa)
			.subscribe((data: any) => {
				this.unidades = data;
				// console.log('Constructor: ', data);
			});
	}

	info(unidad: any) {
		this.unidad_service.getDetalleUnidad(unidad.id).subscribe((data: any) => {
			this.detalle = data;
			// console.log('detalle', data);
		});
	}

	eliminarActivar(id: string, bandera: boolean) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.unidad_service.activarEliminarUnidad(id, bandera)
		.subscribe((response: any) => {
			// console.log(response);
			if (bandera === false) {
				this.mensajes.danger(response);
				this.getUnidades(this.empresas[0].id);
			} else {
				this.mensajes.success(response);
				this.getUnidades(this.empresas[0].id);
			}

		}, error => {
			// console.log(error);
			this.mensajes.warning(error);
			this.getUnidades(this.empresas[0].id);
		});
	}

}
