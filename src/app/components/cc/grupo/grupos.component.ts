import { Component } from '@angular/core';
import { GrupoService } from './../../../services/cc/grupo.service';
import { Grupos } from './../../../interfaces/cc/grupos';


@Component({
	selector: 'app-grupos',
	templateUrl: './grupos.component.html',
	styles: []
})
export class GruposComponent{

	grupos: Grupos[];

	constructor(
		private grupo_service: GrupoService
	) {
		this.grupos = [];
		this.getGrupos();
	 }

	getGrupos() {
		this.grupo_service.getGrupos()
			.subscribe((data: any) => {
				this.grupos = data;
			});
	}


}
