import { Component } from '@angular/core';
import { CuentaService } from './../../../services/cc/cuenta.service';
import { Cuentas } from './../../../interfaces/cc.interface';

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

	eliminar(id: string) {
		this.cuentas_service.eliminarCuenta(id)
			.subscribe((response: any) => {
				this.getCuentas();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Eliminado con exito.');
	}

	activar(sector: Cuentas) {
		this.cuentas_service.activarCuenta({
			id: sector.id,
			nombre: sector.nombre,
			status: !sector.status
		}).subscribe((data: any) => {
				this.getCuentas();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Activado con exito.');
	}


}
