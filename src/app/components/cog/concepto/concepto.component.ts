import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConceptoService } from 'src/app/services/cog/concepto.service';
import { MensajesService } from './../../../services/shared/mensajes.service';
import { Conceptos, Capitulos } from 'src/app/interfaces/cog.interface';
import { TipoGasto } from 'src/app/interfaces/ctg.interface';
import { ActivatedRoute } from '@angular/router';

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
		private mensaje: MensajesService

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
			}, error => {
				this.mensaje.danger(error.error, 'panel-adm/conceptos');
			});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.conceptoService.createUpdateConcepto(this.concepto)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}
}
