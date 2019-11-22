import { Component } from '@angular/core';
import { TipoGasto } from '../../../../../common/interfaces/ctg.interface';
import { TipoGastoService } from '../../../../../common/services/ctg/TipoGastoService';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-tipo-gasto',
	templateUrl: './tipo-gasto.component.html',
	styleUrls: []
})
export class TipoGastoComponent {

	tipoGasto: TipoGasto;

	constructor(
		private tipogastoService: TipoGastoService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService
	) {
		this.tipoGasto = {
			id: '',
			codigo: '',
			nombre: '',
			status: true
		};

		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarTipoGasto(data.id);
			}
		});
	}

	cargarTipoGasto(id: string) {
		this.tipogastoService.getTipoGasto(id)
			.subscribe((obj: any) => {
				this.tipoGasto = obj.data;
			},
			error => {
				this.mensaje.danger(error.error, 'panel-adm/tipos-gastos');
			});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.tipogastoService.createUpdateTipoGasto(this.tipoGasto)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}

}
