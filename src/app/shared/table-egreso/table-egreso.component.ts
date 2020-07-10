import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-table-egreso',
	templateUrl: './table-egreso.component.html',
	styleUrls: ['./table-egreso.component.css']
})
export class TableEgresoComponent implements OnInit {

	@Input() anio: number;
	@Input() datos: any[];
	total: number;

	constructor() { }

	ngOnInit() {
	}

}
