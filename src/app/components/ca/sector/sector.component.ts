import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
		private activitedRoute: ActivatedRoute,
		private router: Router) {

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
		},
		error => {
			this.router.navigate(['panel-adm/sectores']);
			alert(error.error.messaje);
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.sectorservice.createUpdateSector(this.sector)
				.subscribe((obj: any) => {
					console.log(obj);
				},
				error => {
					console.log(error.error);
				});
		}
	}

}