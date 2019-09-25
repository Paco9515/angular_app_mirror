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
	detalle: Rubros;


	constructor(
		private rubros_service: RubroService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_genero: '',
			nombre_genero: '',
			id_grupo: '',
			nombre_grupo: ''
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
			.subscribe((response: any) => {
				console.log(response.message);
				this.getRubros();
			}, error => {
				console.log('ERROR: ', error);
			});
	}

}
