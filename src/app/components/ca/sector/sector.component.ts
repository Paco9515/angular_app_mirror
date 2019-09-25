import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SectorService } from 'src/app/services/ca/sector.service';
import { Sectores } from './../../../interfaces/ca.interface';

@Component({
	selector: 'app-sector',
	templateUrl: './sector.component.html',
	styles: []
})
export class SectorComponent {
	sector: Sectores;

	constructor(
		private sectorservice: SectorService,
		private activitedRoute: ActivatedRoute) {

			this.sector = {
				id: '',
				codigo: '',
				nombre: '',
				status: true
			};

			this.activitedRoute.params.subscribe(( data: any) => {
				if (data.id !== 'nuevo') {
					this.cargarSector(data.id);
				}
			});
	}

	cargarSector(id: string) {
		this.sectorservice.getSector(id).subscribe((obj: any) => {
			this.sector = obj;
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.sectorservice.createUpdateSector(this.sector)
				.subscribe((response: any) => {
					console.log(response);
				},
				error => {
					console.log(error.error);
				});
		}
	}

}