import { Component } from '@angular/core';
import { Rubros } from '../../../../../common/interfaces/cc.interface';
import { RubroService } from '../../../../../common/services/cc/rubro.service';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';

@Component({
	selector: 'app-rubros',
	templateUrl: './rubros.component.html',
	styles: []
})
export class RubrosComponent {

	rubros: Rubros[];
	detalle: Rubros;

	constructor(
		private rubros_service: RubroService,
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
			status_grupo: true
		};
		this.rubros = [];
		this.getRubros();
	 }

	getRubros() {
		this.rubros_service.getRubros()
			.subscribe((data: any) => {
				this.rubros = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.rubros_service.activarEliminarRubro(id, type)
			.subscribe((data: any) => {
				// console.log(response);
				this.getRubros();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}
