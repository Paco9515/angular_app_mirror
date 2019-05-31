import { Component } from '@angular/core';
import { Subcuentas } from './../../../interfaces/cc/subcuentas';
import { SubcuentaService } from './../../../services/cc/subcuenta.service';

@Component({
  selector: 'app-subcuentas',
  templateUrl: './subcuentas.component.html',
  styles: []
})
export class SubcuentasComponent{

	subcuentas: Subcuentas[];

	constructor(
		private subcuentas_service: SubcuentaService
	) {
		this.subcuentas = [];
		this.getSubcuentas();
	 }

	getSubcuentas() {
		this.subcuentas_service.getSubcuentas()
			.subscribe((data: any) => {
				this.subcuentas = data;
			});
	}

}
