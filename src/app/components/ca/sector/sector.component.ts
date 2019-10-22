import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SectorService } from 'src/app/services/ca/sector.service';
import { Sectores } from './../../../interfaces/ca.interface';
import { MensajesService } from './../../../services/shared/mensajes.service';

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
		private mensaje: MensajesService
	) {
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
			this.sector = obj.data;
		},
		error => {
			this.mensaje.danger(error.error, 'panel-adm/sectores');
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.sectorservice.createUpdateSector(this.sector)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}

}