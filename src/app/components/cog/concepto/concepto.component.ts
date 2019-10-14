import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConceptoService } from 'src/app/services/cog/concepto.service';
import { Conceptos, Capitulos } from 'src/app/interfaces/cog.interface';
import { TipoGasto } from 'src/app/interfaces/ctg.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-concepto',
	templateUrl: './concepto.component.html',
	styles: []
  })
  export class ConceptoComponent {

	concepto: Conceptos;
	capitulos: Capitulos;
	gastos: TipoGasto;

	constructor(
		private conceptoService: ConceptoService,
		private activitedRoute: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService

		) {
		this.concepto = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_capitulo: '',
			nombre_capitulo: '',
			id_gasto: '',
			nombre_gasto: '',
		};

		this.activitedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarCapitulos(data.id);
			}
		});

		this.conceptoService.getCapitulos()
			.subscribe((data: any) => {
				this.capitulos = data;
		});

		this.conceptoService.getGastos()
			.subscribe((data: any) => {
				this.gastos = data;
		});
	}

	cargarCapitulos(id: string) {
		this.conceptoService.getConcepto(id)
			.subscribe((obj: any) => {
				this.concepto = obj.data;
			},
			error => {
				this.router.navigate(['panel-adm/conceptos']);
				alert(error.error.messaje);
			});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.conceptoService.createUpdateConcepto(this.concepto)
				.subscribe((response: any) => {
					// console.log(response);
				}, error => {
					// console.log(error.error);
			});
		}
	}
}
