import { Component } from '@angular/core';
import { GrupoService } from './../../../services/cc/grupo.service';
import { Grupos, Generos } from './../../../interfaces/cc.interface';

@Component({
	selector: 'app-grupos',
	templateUrl: './grupos.component.html',
	styles: []
})
export class GruposComponent {

	grupos: Grupos[];
	generos: Generos[];
	detalle: Grupos;

	constructor(
		private grupo_service: GrupoService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_genero: '',
			nombre_genero: ''
		};

		this.grupos = [];
		this.getGrupos();
	 }

	getGrupos() {
		this.grupo_service.getGrupos()
			.subscribe((data: any) => {
				this.grupos = data;
			});
	}

	getGeneros() {
		this.grupo_service.getGeneros()
			.subscribe((data: any) => {
				this.generos = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.grupo_service.activarEliminarGrupo(id, type)
			.subscribe((response: any) => {
				console.log(response.message);
				this.getGrupos();
			}, error => {
				console.log('ERROR: ', error);
			});
	}

}
