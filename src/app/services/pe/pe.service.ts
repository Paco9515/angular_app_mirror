import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
	providedIn: 'root'
})

export class PeService {

	constructor(
		private constants: ConstantsService
	) { }

	get_proyectos() {
		return this.constants.getRequest(`/get_proyectos`, 'get', false);
	}

	get_fases(id: string) {
		return this.constants.getRequest(`/get_fase_proyecto/${id}`, 'get', false);
	}

}
