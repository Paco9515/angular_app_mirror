import { Component } from '@angular/core';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { PresupuestoEgresoService } from '../../../common/services/presupuesto/egreso.service';
import { ActivatedRoute } from '@angular/router';

@Component ({
	selector: 'app-egreso',
	templateUrl: './egreso.component.html',
	styles: []
})

export class EgresoComponent  {

	proyectos: any[];
	total: number;
	mensajeAlert: string;
	centrosCostos: any = [];
	egreso: any = '';

	constructor(
		private mensaje: MensajesService,
		private ccosto_service: CcostoService,
		private presupuestoEgresos: PresupuestoEgresoService,
		private activateRoute: ActivatedRoute,
	) {
		this.activateRoute.params.subscribe(params => {
			this.get_presupuestoId(params['id_presupuesto']);
			this.getDatosPresupuesto(params['id_presupuesto']);
		});
	}

	private getDatosPresupuesto($id_presupuesto: string) {
		this.presupuestoEgresos.get_presupuesto($id_presupuesto)
			.subscribe((data: any) => {
				
				this.proyectos = data.data;
				this.total = this.proyectos.reduce(( contador, proyecto )  => contador + (proyecto.importe), 0);
				this.getCCentroHijos(this.egreso.id_centro_costo);
			}, error => {
				this.mensajeAlert = error.error.message;
			});
	}

	private getCCentroHijos(id_centro_costo){
		this.ccosto_service.getCentrosCostoHijos(id_centro_costo)
			.subscribe((centroCostos: any) => {
				console.log(centroCostos);
				this.centrosCostos = centroCostos.data; 
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	private get_presupuestoId(id_egreso){
		this.presupuestoEgresos.get_presupuestoId(id_egreso)
			.subscribe((egreso: any) => {
				console.log(egreso.data);
				this.egreso = egreso.data; 
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}