import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { TipoGasto } from '../../interfaces/ctg.interface';

@Injectable({
	providedIn: 'root'
})
export class TipoGastoService {
	constructor(private constants: ConstantsService) { }

	createUpdateTipoGasto(tipoGasto: TipoGasto) {
		if (tipoGasto.id === '') {
			return this.constants.getRequest(`/create_tipogasto`, 'post', tipoGasto);
		} else {
			return this.constants.getRequest(`/update_tipogasto`, 'put', tipoGasto);
		}
	}

	getTipoGasto(id: string) {
		return this.constants.getRequest(`/get_tipogasto/${id}`, 'get', false);
	}

	getTiposGastos() {
		return this.constants.getRequest(`/get_tipogastos`, 'get', false);
	}

	activarEliminarTipoGasto(id: string, opcion: boolean) {
		if (opcion) {
			return this.constants.getRequest(`/activate_tipogasto/${id}`, 'get', false);
		} else {
			return this.constants.getRequest(`/delete_tipogasto/${id}`, 'delete', false);
		}
	}
}
