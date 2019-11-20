import { Component } from '@angular/core';
import { FaseService } from 'src/app/common/services/pe/fase.service';
import { Fases } from 'src/app/common/interfaces/pe.interface';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
@Component({
	selector: 'app-fases',
	templateUrl: './fases.component.html'
})
export class FasesComponent {

	fases: Fases[];

	constructor(
		private fase_service: FaseService,
		private mensaje: MensajesService
	) {
		this.fases = [];
		this.getFases();
	}

	getFases() {
		this.fase_service.getFases()
			.subscribe((data: any) => this.fases = data);
	}

	eliminarActivar(id: string, type: boolean) {
		this.fase_service.activarEliminarFase(id, type)
			.subscribe((data: any) => {
				this.getFases();
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}
}
