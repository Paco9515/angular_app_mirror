import { Component } from '@angular/core';
import { GrupoService } from '../../../../../common/services/cc/grupo.service';
import { Grupos, Generos } from '../../../../../common/interfaces/cc.interface';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';

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
		private grupo_service: GrupoService,
		private mensaje: MensajesService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_genero: '',
			nombre_genero: '',
			status_genero: true
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
			.subscribe((data: any) => {
				this.getGrupos();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}
