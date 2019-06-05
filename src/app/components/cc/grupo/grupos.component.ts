import { Component } from '@angular/core';
import { GrupoService } from './../../../services/cc/grupo.service';
import { Grupos } from './../../../interfaces/cc.interface';


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
	
	eliminar(id: string, index: string){
		this.grupo_service.eliminarGrupo(id)
			.subscribe((response: any) => {
				this.getGrupos();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Eliminado con exito.');
	}

	activar(grupo: Grupos) {
		this.grupo_service.activarGrupo({
			id: grupo.id,
			nombre: grupo.nombre,
			status: !grupo.status
		}).subscribe((data: any) => {
				this.getGrupos();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Activado con exito.');
	}


}
