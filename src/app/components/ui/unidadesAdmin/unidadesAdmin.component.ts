import { Component, OnInit } from '@angular/core';
import { UnidadesAdminService } from "src/app/services/ui/unidadesAdmin.service";
import { UnidadesAdmin } from "src/app/interfaces/ui.interface";

@Component({
  selector: 'app-unidadesAdmin',
  templateUrl: './unidadesAdmin.component.html',
  styles: []
})
export class UnidadesAdminComponent {

  unidades: UnidadesAdmin[];

  constructor(
		private unidad_service: UnidadesAdminService
	) {
		this.unidades = [];
		this.getUnidades();
	}

  getUnidades() {
		this.unidad_service.getUnidadesAdmin()
			.subscribe((data: any) => {
				this.unidades = data;
				console.log('Constructor: ', data);
			});
	}

	eliminar(id: string, index: string) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.unidad_service.eliminarUnidad(id)
			.subscribe((response: any) => {
				this.getUnidades();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Eliminado con exito.');
	}
  

}
