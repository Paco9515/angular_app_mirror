import { Component } from '@angular/core';
import { Rubros } from './../../../interfaces/cc.interface';
import { RubroService } from './../../../services/cc/rubro.service';

@Component({
	selector: 'app-rubros',
	templateUrl: './rubros.component.html',
	styles: []
})
export class RubrosComponent {

	rubros: Rubros[];

	constructor(
		private rubros_service: RubroService
	) {
		this.rubros = [];
		this.getRubros();
	 }

	getRubros() {
		this.rubros_service.getRubros()
			.subscribe((data: any) => {
				this.rubros = data;
			});
	}

	eliminar(id: string, index: string) {
		this.rubros_service.eliminarRubro(id)
			.subscribe((response: any) => {
				this.getRubros();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Eliminado con exito.');
	}

	activar(rubro: Rubros) {
		this.rubros_service.activarRubro({
			id: rubro.id,
			nombre: rubro.nombre,
			status: !rubro.status
		}).subscribe((data: any) => {
				this.getRubros();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Activado con exito.');
	}
}
