import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Clas_admin, Subeconomias, Economias, Financieros, Sectores } from '../../../common/interfaces/ca.interface';
import { CaService } from 'src/app/common/services/ca/ca.service';

@Component({
	selector: 'app-ca',
	templateUrl: './ca.component.html'
})
export class CaComponent implements OnInit {
	@Input() primary_keys_ca: any;

	administrativas: Clas_admin[];
	subeconomias: Subeconomias[];
	economias: Economias[];
	financieros: Financieros[];
	sectores: Sectores[];
	data: any;

	@Output() ca = new EventEmitter<any>();

	constructor(
		private caService: CaService
	) {
		this.data = {
			id_administrativa: '',
			id_subeconomia: '',
			id_economia: '',
			id_financiero: '',
			id_sector: ''
		};
	}
	ngOnInit() {
		this.caService.getSectores()
			.subscribe((data: any) => {
				this.sectores = data;
			});

		if (this.primary_keys_ca[0] !== 0) {
			this.onChangeSectores(this.primary_keys_ca[0]);
			this.onChangeFinancieros(this.primary_keys_ca[1]);
			this.onChangeEconomia(this.primary_keys_ca[2]);
			this.onChangeSubeconomia(this.primary_keys_ca[3]);
			this.onChangeAdministrativas(this.primary_keys_ca[4]);

		}
	}

	onChangeSectores(id_sector) {
		this.data.id_financiero = '';
		this.data.id_economia = '';
		this.data.id_subeconomia = '';
		this.data.id_administrativa = '';

		this.financieros = [];
		this.economias = [];
		this.subeconomias = [];
		this.administrativas = [];

		if (id_sector !== '') {
			this.data.id_sector = id_sector;
			this.caService.get_financieros_sector(id_sector)
				.subscribe((data: any) => {
					console.log(data);
					this.financieros = data;
				});
		}
	}

	onChangeFinancieros(id_financiero) {
		this.data.id_economia = '';
		this.data.id_subeconomia = '';
		this.data.id_administrativa = '';

		this.economias = [];
		this.subeconomias = [];
		this.administrativas = [];

		if (id_financiero !== '') {
			this.data.id_financiero = id_financiero;
			this.caService.get_economias_financiero(id_financiero)
				.subscribe((data: any) => {
					this.economias = data;
				});
		}
	}

	onChangeEconomia(id_economia) {
		this.data.id_subeconomia = '';
		this.data.id_administrativa = '';

		this.subeconomias = [];
		this.administrativas = [];

		if (id_economia !== '') {
			this.data.id_economia = id_economia;
			this.caService.get_subeconomias_economia(id_economia)
				.subscribe((data: any) => {
					this.subeconomias = data;
				});
		}
	}

	onChangeSubeconomia(id_subeconomia) {
		this.data.id_administrativa = '';

		this.administrativas = [];

		if (id_subeconomia !== '') {
			this.data.id_subeconomia = id_subeconomia;
			this.caService.get_administrativas_subeconomia(id_subeconomia)
				.subscribe((data: any) => {
					this.administrativas = data;
				});
		}
	}

	onChangeAdministrativas(id_administrativas) {
		this.data.id_administrativa = id_administrativas;
		this.ca.emit(this.data);
	}



}
