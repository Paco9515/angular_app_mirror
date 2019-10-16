import { Component, OnInit } from '@angular/core';
import { UnidadesAdminService } from 'src/app/services/ui/unidadesAdmin.service';
import { UnidadesAdmin } from 'src/app/interfaces/ui.interface';
import { MensajesService } from 'src/app/services/shared/mensajes.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-unidadesAdmin',
  templateUrl: './unidadesAdmin.component.html',
  styles: []
})
export class UnidadesAdminComponent {

  unidades: UnidadesAdmin[];
  detalle: any;

  constructor(
		private unidad_service: UnidadesAdminService,
		private mensajes: MensajesService
	) {
		this.unidades = [];
		this.detalle = {
			id: '',
			id_empresa: '',
			nom_emp: '',
			codigo: '',
			nombre: '',
			desc: '',
			status: true
		};
		this.getUnidades();
	}

  getUnidades() {
		this.unidad_service.getUnidadesAdmin()
			.subscribe((data: any) => {
				this.unidades = data;
				// console.log('Constructor: ', data);
			});
	}

	info(unidad: any) {
		this.detalle = unidad;
		this.unidad_service.getEmpresa(unidad.id_empresa).subscribe((data: any) => {
			this.detalle.nom_emp = data[0].nom_comercial;
		});
	}

	eliminarActivar(id: string, bandera: boolean) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.unidad_service.activarEliminarUnidad(id, bandera)
		.subscribe((response: any) => {
			console.log(response);
			this.mensajes.success(response);
			this.getUnidades();
		}, error => {
			console.log(error);
			this.mensajes.warning(error);
			this.getUnidades();
		});
	}

}
