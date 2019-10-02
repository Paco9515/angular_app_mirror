import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { Sectores } from 'src/app/interfaces/ca.interface';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

	constructor(
		private constants: ConstantsService
	) {}

	createUpdateSector(sector: Sectores) {
		if (sector.id === '') {
			return this.constants.getRequest(`/create_sector`, 'post', sector);
		} else {
			return this.constants.getRequest(`/update_sector`, 'put', sector);
		}
	}

	activarEliminarSector(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_sector/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_sector/${id}`, 'delete', false);
		}
	}

	getSector(id: string) {
		return this.constants.getRequest(`/get_sector/${id}`, 'get', false);
	}

	getSectores() {
		return this.constants.getRequest(`/get_sectores`, 'get', false);
	}


}