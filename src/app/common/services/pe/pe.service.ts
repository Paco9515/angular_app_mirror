import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Presupuesto } from '../../interfaces/presupuesto.interface';

@Injectable({
	providedIn: 'root'
})

export class PeService {

	constructor(
		private constants: ConstantsService
	) { }

	get_presupuestos() {
		return this.constants.getRequest(`/get_presupuestos`, 'get', false);
	}

	get_presupuestos_cc(id: string) {
		return this.constants.getRequest(`/get_presupuestos_cc/${id}`, 'get', false);
	}

	get_presupuesto(id: string) {
		return this.constants.getRequest(`/get_presupuesto/${id}`, 'get', false);
	}

	get_proyectos() {
		return this.constants.getRequest(`/get_proyectos`, 'get', false);
	}

	get_fases(id: string) {
		return this.constants.getRequest(`/get_fase_proyecto/${id}`, 'get', false);
	}

	get_programatica(id: string) {
		return this.constants.getRequest(`/get_clasf_programatica_programa/${id}`, 'get', false);
	}

	get_proyectos_ccostos(id: string) {
		return this.constants.getRequest(`/get_proyectos_ccostos/${id}`, 'get', false);
	}

	create_presupuesto(presupuesto: Presupuesto) {
		return this.constants.getRequest(`/create_presupuesto`, 'post', presupuesto);
	}

	// cambios de egresos
	get_pe(id: string) {
		return this.constants.getRequest(`/get_presupuesto/${id}`, 'get', false);
	}
}
