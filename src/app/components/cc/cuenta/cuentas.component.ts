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
	detalle: Cuentas;

	constructor(
		private cuentas_service: CuentaService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_genero: '',
			nombre_genero: '',
			id_grupo: '',
			nombre_grupo: '',
			id_rubro: '',
			nombre_rubro: ''
		};
		this.cuentas = [];
		this.getCuentas();

	 }

	getCuentas() {
		this.cuentas_service.getCuentas()
			.subscribe((data: any) => {
				this.cuentas = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.cuentas_service.activarEliminarCuenta(id, type)
			.subscribe((response: any) => {
				console.log(response.message);
				this.getCuentas();
			}, error => {
				console.log('ERROR: ', error);
			});
	}

}
