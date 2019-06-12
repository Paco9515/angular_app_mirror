import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConceptoService } from 'src/app/services/cog/concepto.service';
import { Conceptos, Capitulos } from 'src/app/interfaces/cog.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-concepto',
	templateUrl: './concepto.component.html',
	styles: []
  })
  export class ConceptoComponent {

	concepto: Conceptos;
	capitulos: Capitulos;

	constructor(
		private conceptoService: ConceptoService,
		private activitedRoute: ActivatedRoute
		) {
		this.concepto = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_capitulo: '',
			nombre_capitulo: '',
		};

		this.activitedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				console.log(data.id);
				this.cargarCapitulos(data.id);
			}
		});

		this.conceptoService.getCapitulos()
			.subscribe((data: any) => {
				this.capitulos = data;
		});
	}

	cargarCapitulos(id: string) {
		this.conceptoService.getConcepto(id)
			.subscribe((obj: Conceptos) => this.concepto = obj);
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.conceptoService.createUpdateConcepto(this.concepto)
				.subscribe((response: any) => {
					console.log(response);
				}, error => {
					console.log(error.error);
			});
		}
	}

}
