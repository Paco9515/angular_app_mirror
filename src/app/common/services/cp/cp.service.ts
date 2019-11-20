import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CpService {

	constructor(
		private constants: ConstantsService
	) { }

	get_programas() {
		return this.constants.getRequest(`/get_programas`, 'get', false);
	}

	get_subprogramas(id: string) {
		return this.constants.getRequest(`/get_subprogramas_programa/${id}`, 'get', false);
	}
}
