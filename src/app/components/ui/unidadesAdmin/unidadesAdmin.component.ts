import { Component, OnInit } from '@angular/core';
import { UnidadesAdminService } from "src/app/services/ui/unidadesAdmin.service";
import { UnidadesAdmin } from "src/app/interfaces/ui/unidadesAdmin";

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
  

}
