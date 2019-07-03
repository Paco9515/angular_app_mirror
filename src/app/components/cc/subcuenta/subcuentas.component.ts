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
	detalle: Subcuentas;

	constructor(
		private subcuentas_service: SubcuentaService
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
			nombre_rubro: '',
			id_cuenta: '',
			nombre_cuenta: ''
		};
		this.subcuentas = [];
		this.getSubcuentas();
	 }

	getSubcuentas() {
		this.subcuentas_service.getSubcuentas()
			.subscribe((data: any) => {
				this.subcuentas = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.subcuentas_service.activarEliminarSubcuenta(id, type)
			.subscribe((response: any) => {
				console.log(response.message);
				this.getSubcuentas();
			}, error => {
				console.log('ERROR: ', error);
			});
	}

}
