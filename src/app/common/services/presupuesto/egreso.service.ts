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

	get_presupuestoId(id: string) {
		return this.constants.getRequest(`/get_presupuestoEgresosId/${id}`, 'get', false);
	}

	get_presupuestoEgreso_por_centro_anio(id_centro_costo: number, anio: number) {
		return this.constants.getRequest(`/get_presupuestoEgreso_por_centro_anio/${id_centro_costo}/${anio}`, 'get', false);
	}

	get_presupuestoActual(id_centro_costo: string) {
		return this.constants.getRequest(`/get_presupuestoEgresoActual/${id_centro_costo}`, 'get', false);
	}

	get_enviar_a_evacuacion_egreso_por_superior(id_egreso: string) {
		return this.constants.getRequest(`/get_enviar_a_evacuacion_egreso_por_superior/${id_egreso}`, 'get', false);
	}

	get_aprobar_egreso(id_centro_costo: number, anio: number ) {
		return this.constants.getRequest(`/get_aprobar_egreso/${id_centro_costo}/${anio}`, 'get', false);
	}

	/* OBTIENE EL PRESUPUESTO DE EGRESOS DEL CENTRO DE COSTO PADRE E HIJOS FORMANDO UN PREUSPUETSO GENERAL */
	get_presupuesto_egresos_general(id_centro_costo: string, anio: number) {
		return this.constants.getRequest(`/get_presupuesto_egresos_general/${id_centro_costo}/${anio}`, 'get', false);
	}

	// ** SERVICIOS PARA LA MODIFICACION DEL EGRESO ** //
	get_egreso(id: string) {
		return this.constants.getRequest(`/get_presupuestoEgresos/${id}`, 'get', false);
	}

	// SERVICOO QUE MODIFICA EL EGRESO Y GUARDA LOS CAMBIOS EN EL HISTORIAL
	modificar_egreso(info: any) {
		return this.constants.getRequest(`/update_partidasEgreso`, 'put', info);
	}

	// Consultas para presupuesto de egresos por clasificaciones
	get_presupuesto_egreso_por_clasificacion(clasificacion: string, presupuesto: any) {
		return this.constants.getRequest(`/get_presupuesto_egreso_por_clasificacion/${clasificacion}/${presupuesto.id_centro_costo}/${presupuesto.anio}`, 'get', false);
	}
}