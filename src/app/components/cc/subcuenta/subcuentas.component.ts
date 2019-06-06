import { Component } from '@angular/core';
import { Subcuentas } from './../../../interfaces/cc.interface';
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

	eliminar(id: string) {
		this.subcuentas_service.eliminarSubcuenta(id)
			.subscribe((response: any) => {
				this.getSubcuentas();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Eliminado con exito.');
	}

	activar(sector: Subcuentas) {
		this.subcuentas_service.activarSubcuenta({
			id: sector.id,
			nombre: sector.nombre,
			status: !sector.status
		}).subscribe((data: any) => {
				this.getSubcuentas();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Activado con exito.');
	}

}
