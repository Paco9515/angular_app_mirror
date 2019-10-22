import { Component } from '@angular/core';
import { Subcuentas } from './../../../interfaces/cc.interface';
import { SubcuentaService } from './../../../services/cc/subcuenta.service';
import { MensajesService } from './../../../services/shared/mensajes.service';

@Component({
  selector: 'app-subcuentas',
  templateUrl: './subcuentas.component.html',
  styles: []
})
export class SubcuentasComponent {

	subcuentas: Subcuentas[];
	detalle: Subcuentas;

	constructor(
		private subcuentas_service: SubcuentaService,
		private mensaje: MensajesService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_genero: '',
			nombre_genero: '',
			status_genero: true,
			id_grupo: '',
			nombre_grupo: '',
			status_grupo: true,
			id_rubro: '',
			nombre_rubro: '',
			status_rubro: true,
			id_cuenta: '',
			nombre_cuenta: '',
			status_cuenta: true
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
			.subscribe((data: any) => {
				this.getSubcuentas();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}
