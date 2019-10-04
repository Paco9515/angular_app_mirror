import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EconomiaService } from 'src/app/services/ca/economia.service';
import { Economias, Financieros, Sectores } from '../../../interfaces/ca.interface';

@Component({
	selector: 'app-economia',
	templateUrl: './economia.component.html',
	styles: []
})
export class EconomiaComponent implements OnInit {

	economia: Economias;
	financieros: Financieros[];
	sectores: Sectores[];

	financiero = true;

  constructor(
	private economiaService: EconomiaService,
	private activitedRoute: ActivatedRoute,
	private router: Router,
	) {

		this.economia = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_financiero: '',
			id_sector: ''
		};
	}

	ngOnInit() {
		this.economiaService.getSectores()
			.subscribe((data: any) => {
			this.sectores = data;
		});

		this.activitedRoute.params.subscribe(( data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarEconomia(data.id);
			}
		});
	}

	onChangeSector(id_sector) {
		this.economia.id_financiero = '';
		this.financieros = [];
		this.financiero = false;
		if (id_sector !== '') {
			this.economia.id_sector = id_sector;
			this.economiaService.getFinancierosSector(id_sector)
			.subscribe((obj: any) => {
				this.financieros = obj.data;
			});
		}
	}

	onChangeFinanciero(id_financiero) {
		this.economia.id_financiero = id_financiero;
	}

	cargarEconomia(id: string) {
		this.economiaService.getEconomia(id).subscribe((obj: any) => {
			this.economia = obj.data;
			const FINANCIERO = this.economia.id_financiero;
			this.onChangeSector(this.economia.id_sector);
			this.onChangeFinanciero(FINANCIERO);
		},
		error => {
			this.router.navigate(['panel-adm/economias']);
			alert(error.error.messaje);
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.economiaService.createUpdateEconomia(this.economia)
			.subscribe((response: any) => {
				// console.log(response);
			},
			error => {
				// console.log(error.error);
			});
		}
	}

}
