import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SubeconomiaService } from 'src/app/services/ca/subeconomia.service';
import { Subeconomias, Economias, Financieros, Sectores } from '../../../interfaces/ca.interface';

@Component({
	selector: 'app-subeconomia',
	templateUrl: './subeconomia.component.html',
	styles: []
})
export class SubeconomiaComponent  implements OnInit {

	subeconomia: Subeconomias;
	economias: Economias[] = [];
	financieros: Financieros[] = [];
	sectores: Sectores;

	financiero = true;
	economia = true;

  	constructor(
		private subeconomiaService: SubeconomiaService,
		private activitedRoute: ActivatedRoute) {
		this.subeconomia = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_economia: '',
			nombre_economia: '',
			id_financiero: '',
			nombre_financiero: '',
			id_sector: '',
			nombre_sector: ''
		};
		this.subeconomiaService.getSectores().subscribe((data: any) => {
			this.sectores = data;
		});
	}

	ngOnInit() {
		this.activitedRoute.params.subscribe(( data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarSubeconomia(data.id);
			}
		});
	}

	onChangeSector(id_sector) {
		this.subeconomia.id_financiero = '';
		this.financieros = [];
		this.subeconomia.id_economia = '';
		this.economias = [];
		this.financiero = false;
		this.economia = true;
		if (id_sector !== '') {
			this.subeconomia.id_sector = id_sector;
			this.subeconomiaService.getFinancierosSector(id_sector)
			.subscribe((obj: any) => {
				this.financieros = obj.data;
			});
		}
	}

	onChangeFinanciero(id_financiero) {
		this.subeconomia.id_economia = '';
		this.economias = [];
		this.economia = false;
		if (id_financiero !== '') {
			this.subeconomia.id_financiero = id_financiero;
			this.subeconomiaService.getEconomiasFinanciero(id_financiero)
			.subscribe((obj: any) => {
				this.economias = obj.data;
			});
		}
	}

	onChangeEconomia(id_economia) {
		this.subeconomia.id_economia = id_economia;
	}


	cargarSubeconomia(id: string) {
		this.subeconomiaService.getSubeconomia(id).subscribe((obj: any) => {
			this.subeconomia = obj.data;
			const FINANCIERO = this.subeconomia.id_financiero;
			const ECONOMIA = this.subeconomia.id_economia;
			this.onChangeSector(this.subeconomia.id_sector);
			this.onChangeFinanciero(FINANCIERO);
			this.onChangeEconomia(ECONOMIA);
		},
		error => {
			// console.log(error.error);
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.subeconomiaService.createUpdateSubeconomia(this.subeconomia)
				.subscribe((obj: any) => {
					// console.log(obj);
				},
				error => {
					// console.log(error.error);
				});
		}
	}

}

