import { Component } from '@angular/core';
import { Subprograma } from 'src/app/interfaces/cp.interface';
import { SubprogramaService } from 'src/app/services/cp/subprograma.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Programas } from '../../../interfaces/cp.interface';

@Component({
	selector: 'app-subprograma',
	templateUrl: './subprograma.component.html',
	styles: []
})
export class SubprogramaComponent {

	subprograma: Subprograma;
	programas: Programas;

	constructor(
		private subprogramaService: SubprogramaService,
		private activatedRoute: ActivatedRoute,
	) {
		this.subprograma = {
			id: '',
			id_programa: '',
			nombre_programa: '',
			codigo: '',
			nombre: '',
			status: true
		};

		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarSubprogramas(data.id);
			}
		});

		this.subprogramaService.getProgramas()
			.subscribe((data: any) => {
				this.programas = data;
			});

	}



	cargarSubprogramas(id: string) {
		this.subprogramaService.getSubprograma(id)
			.subscribe((obj: Subprograma) => {

				this.subprograma = obj;
				console.log(this.subprograma);
			});
	}

	guardar(f: NgForm) {
		// console.log(f.dirty);
		if (f.valid) {
			console.log(this.subprograma);
			this.subprogramaService.createUpdateSubprograma(this.subprograma)
				.subscribe((response: any) => {
					console.log(response);
				}, error => {
					console.log(error.error);
				});
		}
	}

}
