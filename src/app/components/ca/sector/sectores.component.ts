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

	constructor(
		private sectores_service: SectorService
	) {
		this.sectores = [];
		this.getSectores();
	 }

	getSectores() {
		this.sectores_service.getSectores()
			.subscribe((data: any) => {
				this.sectores = data;
			});
		}

	eliminar(id: string) {
		this.sectores_service.eliminarSector(id)
			.subscribe((response: any) => {
				this.getSectores();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Eliminado con exito.');
	}

	activar(sector: Sectores) {
		this.sectores_service.activarSector({
			id: sector.id,
			nombre: sector.nombre,
			status: !sector.status
		}).subscribe((data: any) => {
				this.getSectores();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Activado con exito.');
	}

}