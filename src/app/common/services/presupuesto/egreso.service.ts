import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { PresupuestoEgreso } from '../../interfaces/presupuesto.interface';

@Injectable({
	providedIn: 'root'
})
export class PresupuestoEgresoService {

	constructor(
		private constants: ConstantsService
		) {}

	create_presupuesto(presupuesto: PresupuestoEgreso) {
		return this.constants.getRequest(`/create_presupuestoEgresos`, 'post', presupuesto);
	}

	get_presupuestos_cc(id: string) {
		return this.constants.getRequest(`/get_presupuestosEgresos_cc/${id}`, 'get', false);
	}

	get_presupuesto(id: string) {
		return this.constants.getRequest(`/get_presupuestoEgresos/${id}`, 'get', false);
	}

	get_presupuestoActual(id_cc: string) {
		return this.constants.getRequest(`/get_presupuestoEgresoActual/${id_cc}`, 'get', false);
	}

	// ** SERVICIOS PARA LA MODIFICACION DEL EGRESO ** //
	get_egreso(id: string) {
		return this.constants.getRequest(`/get_presupuestoEgresos/${id}`, 'get', false);
	}

	// SERVICOO QUE MODIFICA EL EGRESO Y GUARDA LOS CAMBIOS EN EL HISTORIAL
	modificar_egreso(info: any) {
		return this.constants.getRequest(`/update_partidasEgreso`, 'put', info);
	}


}