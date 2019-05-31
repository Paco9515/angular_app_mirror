import { Component } from '@angular/core';
import { CuentaService } from './../../../services/cc/cuenta.service';
import { Cuentas } from './../../../interfaces/cc/cuentas';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styles: []
})
export class CuentasComponent {


	cuentas: Cuentas[];

	constructor(
		private cuentas_service: CuentaService
	) {
		this.cuentas = [];
		this.getCuentas();
	 }

	getCuentas() {
		this.cuentas_service.getCuentas()
			.subscribe((data: any) => {
				this.cuentas = data;
			});
	}


}
