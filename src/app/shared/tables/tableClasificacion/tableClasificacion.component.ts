import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-table-clasificacion',
  templateUrl: './tableClasificacion.component.html',
  styles: []
})
export class TableClasificacionComponent {

	@Input() datosClasificacion: any[] = [];

	constructor() {}

	calcularImporteTotal(): number {
		return this.datosClasificacion.reduce((contador, egreso) => contador + parseFloat(egreso.importe), 0);
	}
}
