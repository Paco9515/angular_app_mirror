import { Component } from '@angular/core';
import { ProgramaService } from 'src/app/common/services/cp/programa.service';
import { ActivatedRoute } from '@angular/router';
import { Programas } from 'src/app/common/interfaces/cp.interface';
import { NgForm } from '@angular/forms';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';

@Component({
	selector: 'app-programa',
	templateUrl: './programa.component.html'
})
export class ProgramaComponent {
	programa: Programas;

	constructor(
		private programaService: ProgramaService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService
	) {
		this.programa = {
			id: '',
			codigo: '',
			nombre: '',
			status: true
		};

		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarprograma(data.id);
			}
		});
	}

	cargarprograma(id: string) {
		this.programaService.getPrograma(id)
			.subscribe((obj: any) => {
				this.programa = obj.data;
			},
			error => {
				this.mensaje.danger(error.error, 'panel-adm/programas');
			});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.programaService.createUpdatePrograma(this.programa)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}
}
