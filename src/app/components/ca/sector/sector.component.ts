import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SectorService } from 'src/app/services/ca/sector.service';
import { Sectores } from './../../../interfaces/ca.interface';

@Component({
	selector: 'app-sector',
	templateUrl: './sector.component.html',
	styles: []
})
export class SectorComponent {

	id: string;
	forma: FormGroup;

	constructor(
		private sectorservice: SectorService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {

		this.forma = new FormGroup({
			codigo: new FormControl('', Validators.required),
			nombre: new FormControl('', Validators.required)
		});

		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.sectorservice.getSector(this.id)
					.subscribe((obj: Sectores) => {
						this.createForma(obj);
					});
			} else {
				this.createForma({id: '', codigo: '', nombre: '', status: ''});
			}
		});
	}

	createForma(obj: any) {
		this.forma = new FormGroup({
			id: new FormControl(obj.id),
			codigo: new FormControl(obj.codigo, Validators.required),
			nombre: new FormControl(obj.nombre, Validators.required),
			status: new FormControl(obj.status)
		});
	}

	guardar() {
		this.sectorservice.createSector(this.forma.value)
			.subscribe((response: any) => {
		});
	}

}