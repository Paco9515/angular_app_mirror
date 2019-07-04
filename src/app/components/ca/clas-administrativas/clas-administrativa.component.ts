import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClasAdministrativaService } from 'src/app/services/ca/clas-administrativa.service';
import { Clas_admin, Subeconomias, Economias, Financieros, Sectores } from '../../../interfaces/ca.interface';

@Component({
	selector: 'app-clas-administrativa',
	templateUrl: './clas-administrativa.component.html',
	styles: []
})
export class ClasAdministrativaComponent implements OnInit{

	admin: Clas_admin;
	subeconomias: Subeconomias;
	economias: Economias;
	financieros: Financieros;
	sectores: Sectores;

	constructor(
		private adminService: ClasAdministrativaService,
		private activitedRoute: ActivatedRoute) {

		this.admin = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_subeconomia: '',
			nombre_subeconomia: '',
			id_economia: '',
			nombre_economia: '',
			id_financiero: '',
			nombre_financiero: '',
			id_sector: '',
			nombre_sector: ''
		};


		this.adminService.getSectores().subscribe((data: any) => {
			this.sectores = data;
		});

		this.adminService.getFinancieros().subscribe((obj: Financieros) => {
			this.financieros = obj;
			console.log(this.financieros);
		});

		this.adminService.getEconimias().subscribe((obj: Economias) => {
			this.economias = obj;
			console.log(this.economias);
		});

		this.adminService.getSubeconimias().subscribe((obj: Subeconomias) => {
			this.subeconomias = obj;
			console.log(this.subeconomias);
		});
	}


	ngOnInit() {
		this.activitedRoute.params.subscribe(( data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarAdmin(data.id);
			}
		});
	}

	cargarAdmin(id: string) {
		this.adminService.getClasAdmin(id).subscribe((obj: any) => {
			this.admin = obj;
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.adminService.createUpdateClasAdmin(this.admin)
				.subscribe((response: any) => {
					console.log(response);
				},
				error => {
					console.log(error.error);
				});
		}
	}

}
