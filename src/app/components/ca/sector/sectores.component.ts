import { Component, OnInit } from '@angular/core';
import { SectorService } from './../../../services/ca/sector.service';
import { Sectores } from './../../../interfaces/ca/sector';

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
}
