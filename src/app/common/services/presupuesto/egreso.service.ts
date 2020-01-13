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

	// cambios de egresos
	get_egreso(id: string) {
		return this.constants.getRequest(`/get_presupuestoEgresos/${id}`, 'get', false);
	}

}