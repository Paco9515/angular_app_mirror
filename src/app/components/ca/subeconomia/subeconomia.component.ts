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
export class SubeconomiaComponent  implements OnInit{

	subeconomia: Subeconomias;
	economias: Economias[] = [];
	financieros: Financieros[] = [];
	sectores: Sectores;

  	constructor(
		private subeconomiaService: SubeconomiaService,
		private activitedRoute: ActivatedRoute) 
	{
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

		this.subeconomiaService.getFinancieros().subscribe((obj: Financieros[]) => {
			this.financieros = obj;

		});

		this.subeconomiaService.getEconomias().subscribe((obj: Economias[]) => {
			this.economias = obj;
		});

	}

	ngOnInit() {
		this.activitedRoute.params.subscribe(( data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarSubeconomia(data.id);
			}
		});
	}

	cargarSubeconomia(id: string) {
		this.subeconomiaService.getSubeconomia(id).subscribe((obj: any) => {
			this.subeconomia = obj;
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.subeconomiaService.createUpdateSubeconomia(this.subeconomia)
				.subscribe((response: any) => {
					console.log(response);
				},
				error => {
					console.log(error.error);
				});
		}
	}

}

