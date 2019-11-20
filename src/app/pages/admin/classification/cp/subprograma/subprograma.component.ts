import { Component } from '@angular/core';
import { Subprograma } from 'src/app/common/interfaces/cp.interface';
import { SubprogramaService } from 'src/app/common/services/cp/subprograma.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Programas } from '../../../../../common/interfaces/cp.interface';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';
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
		private mensaje: MensajesService
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
			.subscribe((obj: any) => {

				this.subprograma = obj.data;
			});
	}

	guardar(f: NgForm) {
		// console.log(f.dirty);
		if (f.valid) {
			this.subprogramaService.createUpdateSubprograma(this.subprograma)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}

}
