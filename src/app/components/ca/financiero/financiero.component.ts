import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FinancieroService } from 'src/app/services/ca/financiero.service';
import { Financieros, Sectores } from '../../../interfaces/ca.interface';

@Component({
  selector: 'app-financiero',
  templateUrl: './financiero.component.html',
  styles: []
})
export class FinancieroComponent {

	financiero: Financieros;
	sectores: Sectores;

	constructor(
		private financieroService: FinancieroService,
		private activitedRoute: ActivatedRoute)
	{
		this.financiero = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_sector: '',
			nombre_sector: ''
		};

		this.activitedRoute.params.subscribe(( data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarFinanciero(data.id);
			}
		});

		this.financieroService.getSectores().subscribe((data: any) => {
			this.sectores = data;
		});
	}

	cargarFinanciero(id: string) {
		this.financieroService.getFinanciero(id).subscribe((obj: any) => {
			this.financiero = obj;
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.financieroService.createUpdateFinanciero(this.financiero)
				.subscribe((response: any) => {
					console.log(response);
				},
				error => {
					console.log(error.error);
				});
		}
	}

}
