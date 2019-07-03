import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EconomiaService } from 'src/app/services/ca/economia.service';
import { Economias, Financieros, Sectores } from '../../../interfaces/ca.interface';

@Component({
	changeDetection: ChangeDetectionStrategy.Default,
	selector: 'app-economia',
	templateUrl: './economia.component.html',
	styles: []
})
export class EconomiaComponent implements OnInit{

	economia: Economias;
	financieros: Financieros;
	sectores: Sectores;

  constructor(
	private economiaService: EconomiaService,
	private activitedRoute: ActivatedRoute) {

		this.economia = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_financiero: '',
			nombre_financiero: '',
			id_sector: '',
			nombre_sector: ''
		};

		this.economiaService.getSectores().subscribe((data: any) => {
			this.sectores = data;
		});

		this.economiaService.getFinancieros().subscribe((obj: Financieros) => {
			this.financieros = obj;
		});

	}

	ngOnInit() {
		this.activitedRoute.params.subscribe(( data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarEconomia(data.id);
			}
		});
	}

	getFinancieros(id_sector) {
		if(this.financieros.id_sector == id_sector){
			return this.financieros;
		}
	}

	cargarEconomia(id: string) {
		this.economiaService.getEconomia(id).subscribe((obj: any) => {
			this.economia = obj;
		});
	}




	guardar(f: NgForm) {
		if (f.valid) {
			this.economiaService.createUpdateEconomia(this.economia)
				.subscribe((response: any) => {
					console.log(response);
				},
				error => {
					console.log(error.error);
				});
		}
	}

}
