import { Component, OnInit } from '@angular/core';
import { PresupuestoEgresoService } from '../../../common/services/presupuesto/egreso.service';
import { ActivatedRoute } from '@angular/router';

@Component ({
	selector: 'app-egreso',
	templateUrl: './egreso.component.html',
	styles: []
})

export class EgresoComponent implements OnInit {

	proyectos: any;
	anioPresEgreso: number;
	total: number;

	constructor(
		private presupuestoEgresos: PresupuestoEgresoService,
		private activateRoute: ActivatedRoute
	) {
		this.activateRoute.params.subscribe(params => {
			this.getPresupuesto(params['id_presupuesto']);
		});
	}

	private getPresupuesto($id_presupuesto: string) {
		this.presupuestoEgresos.get_presupuesto($id_presupuesto)
		.subscribe((data: any) => {
			this.proyectos = data.data;
			this.total = this.proyectos.reduce(( acc, obj )  => acc + (obj.importe), 0);
		});
	}

	ngOnInit() {}
}