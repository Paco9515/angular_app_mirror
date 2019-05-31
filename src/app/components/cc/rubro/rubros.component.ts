import { Component } from '@angular/core';
import { Rubros } from './../../../interfaces/cc/rubros';
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
}
