import { Component } from '@angular/core';
import { SectorService } from './../../../services/ca/sector.service';
import { Sectores } from './../../../interfaces/ca.interface';

@Component({
  selector: 'app-sectores',
  templateUrl: './sectores.component.html',
  styles: []
})
export class SectoresComponent {

	sectores: Sectores[];
	detalle: Sectores;

	constructor(
		private sectores_service: SectorService
	) {
		this.detalle = {
			id: '',
			codigo: '',
			nombre: '',
			status: true
		};

		this.sectores = [];
		this.getSectores();
	 }

	getSectores() {
		this.sectores_service.getSectores()
			.subscribe((data: any) => {
				this.sectores = data;
			});
		}

	eliminarActivar(id: string, type: boolean) {
		this.sectores_service.activarEliminarSector(id, type)
			.subscribe((obj: any) => {
				console.log(obj);
				this.getSectores();
			}, error => {
				console.log('ERROR: ', error.error);
			});
	}
}