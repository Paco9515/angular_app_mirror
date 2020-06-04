import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
	providedIn: 'root'
})
export class CambioEgresoService {

	constructor(
		private constants: ConstantsService
        ) {}

    get_presupuestoActualByCc(id_centro: string) {
        return this.constants.getRequest(`/get_presupuesto_actual_by_cc/${id_centro}`, 'get', false);
    }

    get_presupuestosActualesHijosCc(id_centro: string) {
        return this.constants.getRequest(`/get_presupuestos_actuales_hijos_cc/${id_centro}`, 'get', false);
    }

    get_arbol(id_centro: string) {
        return this.constants.getRequest(`/get_hijos_cc/${id_centro}`, 'get', false);
    }

    get_proyectosActuales(id_cc: string) {
        return this.constants.getRequest(`/get_proyectosActualesByCc/${id_cc}`, 'get', false);
    }

    get_fasesActuales(id_proyecto: string) {
        return this.constants.getRequest(`/get_fasesActualesByProyecto/${id_proyecto}`, 'get', false);
    }

    get_partidasActuales(id_fase: string) {
        return this.constants.getRequest(`/get_partidasActualesByFase/${id_fase}`, 'get', false);
    }

    create_movimiento(movimiento: any) {
        return this.constants.getRequest(`/create_movimiento`, 'post', movimiento);
    }

    /* get_centrosConMovimientosPendientesByCc(id_cc: string) {
        return this.constants.getRequest(`/get_movimientos_by_cc/${id_cc}`, 'get', false);
    } */

    // ** CENTROS DE COSTO CON MOVIMIENTOS PENDIENTES Y REVISADOS ** //
    get_centrosHijosConAumentosByCc(datos: any) {
        return this.constants.getRequest(`/get_centros_with_aumentos_hijos_by_cc`, 'post', datos);
    }

    get_centrosHijosConDisminByCc(datos: any) {
            return this.constants.getRequest(`/get_centros_with_dismin_hijos_by_cc`, 'post', datos);    
    }

    get_centrosHijosConTransfByCc(datos: any) {
            return this.constants.getRequest(`/get_centros_with_transf_hijos_by_cc`, 'post', datos);
        
    }
    
    // ** MOVIMIENTOS PENDIENTES Y REVISADOS ** //
    get_aumentos_by_cc(datos: any) {
        return this.constants.getRequest(`/get_aumentos_by_cc`, 'post', datos);
    }

    get_disminuciones_by_cc(datos: any) {
        return this.constants.getRequest(`/get_disminuciones_by_cc`, 'post', datos);
    }

    get_transferencias_by_cc(datos: any) {
        return this.constants.getRequest(`/get_transferencias_by_cc`, 'post', datos);
    }

    get_cc(id_cc: string) {
        return this.constants.getRequest(`/get_cc/${id_cc}`, 'get', false);
    }

    getFasePartidaById(id_fase_partida: string) {
        return this.constants.getRequest(`/get_fase_partida_by_id/${id_fase_partida}`, 'get', false);
    }
        
}