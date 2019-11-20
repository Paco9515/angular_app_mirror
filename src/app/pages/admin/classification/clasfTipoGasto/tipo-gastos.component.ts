import { Component } from '@angular/core';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { TipoGasto } from 'src/app/common/interfaces/ctg.interface';
import { TipoGastoService } from 'src/app/common/services/ctg/TipoGastoService';

@Component({
  selector: 'app-tipo-gastos',
  templateUrl: './tipo-gastos.component.html',
  styleUrls: []
})

export class TipoGastosComponent {

  tiposGastos: TipoGasto[];

	constructor(
		private tipoGastoService: TipoGastoService,
		private mensaje: MensajesService
	) {
		this.tiposGastos = [];
		this.getTiposGastos();
	}

	getTiposGastos() {
		this.tipoGastoService.getTiposGastos()
			.subscribe((data: any) => this.tiposGastos = data);
	}

	eliminarActivar(id: string, type: boolean) {
		this.tipoGastoService.activarEliminarTipoGasto(id, type)
			.subscribe((data: any) => {
				this.getTiposGastos();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}
}
