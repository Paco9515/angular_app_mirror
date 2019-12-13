import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DataPresupuestoEgresoService {
	constructor() {}

	_showData: any;

	set showData(value: any) {
	this._showData = value;
	}

	get showData(): any {
	return this._showData;
	}

}
