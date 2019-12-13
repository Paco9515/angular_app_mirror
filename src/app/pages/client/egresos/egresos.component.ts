import { Component } from '@angular/core';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { PeService } from 'src/app/common/services/pe/pe.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {

	presupuestos: any = [];

	constructor(
		private mensaje: MensajesService,
		private pe_service: PeService,
		private router: Router
		) {
			this.pe_service.get_presupuestos()
				.subscribe((data) => {
					this.presupuestos = data;
				});
	}

	mostrarProyectos( id_presupuesto: string) {
		this.router.navigate([`/panel-adm/pres_egresos/${id_presupuesto}/proyectos`]);
	}


}
