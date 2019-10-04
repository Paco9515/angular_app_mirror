import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasAdministrativaService } from 'src/app/services/ca/clas-administrativa.service';
import { Clas_admin, Subeconomias, Economias, Financieros, Sectores } from '../../../interfaces/ca.interface';

@Component({
	selector: 'app-clas-administrativa',
	templateUrl: './clas-administrativa.component.html',
	styles: []
})
export class ClasAdministrativaComponent implements OnInit {

	admin: Clas_admin;
	subeconomias: Subeconomias[];
	economias: Economias[];
	financieros: Financieros[];
	sectores: Sectores[];

	financiero = true;
	economia = true;
	subeconomia = true;

	constructor(
		private adminService: ClasAdministrativaService,
		private activitedRoute: ActivatedRoute,
		private router: Router) {

		this.admin = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_subeconomia: '',
			id_economia: '',
			id_financiero: '',
			id_sector: ''
		};
	}


	ngOnInit() {
		this.adminService.getSectores()
			.subscribe((data: any) => {
			this.sectores = data;
		});

		this.activitedRoute.params.subscribe(( data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarAdmin(data.id);
			}
		});
	}

	onChangeSector(id_sector) {
		this.admin.id_financiero = '';
		this.financieros = [];
		this.admin.id_economia = '';
		this.economias = [];
		this.admin.id_subeconomia = '';
		this.subeconomias = [];
		this.financiero = false;
		this.economia = true;
		this.subeconomia = true;
		if (id_sector !== '') {
			this.admin.id_sector = id_sector;
			this.adminService.getFinancierosSector(id_sector)
			.subscribe((obj: any) => {
				this.financieros = obj.data;
			});
		}
	}

	onChangeFinanciero(id_financiero) {
		this.admin.id_economia = '';
		this.economias = [];
		this.admin.id_subeconomia = '';
		this.subeconomias = [];
		this.economia = false;
		this.subeconomia = true;
		if (id_financiero !== '') {
			this.admin.id_financiero = id_financiero;
			this.adminService.getEconomiasFinanciero(id_financiero)
			.subscribe((obj: any) => {
				this.economias = obj.data;
			});
		}
	}

	onChangeEconomia(id_economia) {
		this.admin.id_subeconomia = '';
		this.subeconomias = [];
		this.subeconomia = false;
		if (id_economia !== '') {
			this.admin.id_economia = id_economia;
			this.adminService.getSubeconomiasEconomia(id_economia)
			.subscribe((obj: any) => {
				this.subeconomias = obj.data;
			});
		}
	}

	onChangeSubeconomia(id_subeconomia) {
		this.admin.id_subeconomia = id_subeconomia;
	}

	cargarAdmin(id: string) {
		this.adminService.getClasAdmin(id).subscribe((obj: any) => {
			this.admin = obj.data;
			const FINANCIERO = this.admin.id_financiero;
			const ECONOMIA = this.admin.id_economia;
			const SUBECONOMIA = this.admin.id_subeconomia;
			this.onChangeSector(this.admin.id_sector);
			this.onChangeFinanciero(FINANCIERO);
			this.onChangeEconomia(ECONOMIA);
			this.onChangeSubeconomia(SUBECONOMIA);
		},
		error => {
			this.router.navigate(['panel-adm/administrativas']);
			alert(error.error.messaje);
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.adminService.createUpdateClasAdmin(this.admin)
				.subscribe((response: any) => {
					// console.log(response);
				},
				error => {
					// console.log(error.error);
				});
		}
	}

}
