import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-table-egreso',
	templateUrl: './table-egreso.component.html',
	styles: []
})
export class TableEgresoComponent implements OnInit {

	@Input() anio: number;
	@Input() datos: any[];
	total: number;

	constructor() { }

	ngOnInit() {
		this.total = this.datos.reduce((contador, data) => contador + parseFloat(data.importe), 0);

	}

}
