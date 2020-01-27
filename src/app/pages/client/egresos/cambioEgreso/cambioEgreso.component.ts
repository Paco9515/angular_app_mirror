import { Component, OnInit } from '@angular/core';
import { PresupuestoEgresoService } from '../../../../common/services/presupuesto/egreso.service';
// import { ActivatedRoute } from '@angular/router';
// import { NgForm } from '@angular/forms';


@Component({
	selector: 'app-cambioEgreso',
	templateUrl: './cambioEgreso.component.html',
	styles: []
})
export class CambioEgresoComponent {

	proyectos: any[];
	proyectos2: any[];
	anioPresEgreso: number;
	totalProyecto: number;
	totalProyecto2: number;
	diff: number;
	anioEgreso: number;
	bandera: number;
	bandImporte: boolean;
	cuentaTabla: boolean;
	array2: any[];
	aumentTranf: boolean;

	constructor(
		private presupuestoEgresos: PresupuestoEgresoService,
	) {
		this.totalProyecto = 0;
		this.totalProyecto2 = 0;
		this.diff = 0;
		this.bandera = 0;
		this.bandImporte = false;
		this.cuentaTabla = true;
		this.proyectos = [];
		this.proyectos2 = [];
		this.array2 = [];

		this.inicio();
	}

	private inicio() {
		this.totalProyecto = 0;
		this.totalProyecto2 = 0;
		this.diff = 0;
		this.bandera = 0;
		this.bandImporte = false;
		this.cuentaTabla = true;
		this.presupuestoEgresos.get_presupuesto('1')
		.subscribe((data1: any) => {
			this.proyectos2 = data1.data;
		});

		this.presupuestoEgresos.get_presupuesto('1')
		.subscribe((data2: any) => {
			this.proyectos = data2.data;
			this.totalProyecto = 0;
			for (const proyecto of this.proyectos) {
				this.totalProyecto += proyecto.importe;
				this.totalProyecto2 += proyecto.importe;
			}

			this.anioEgreso = this.proyectos[1].anio;
		});
	}

	private aumento() {
		this.aumentTranf = true;
		// this.desbloquearBandera();
		this.cuentaTabla = false;
		document.getElementById('tabla1').removeAttribute('style');
	}

	private transferir() {
		this.aumentTranf = false;
		this.cuentaTabla = false;
		document.getElementById('tabla1').removeAttribute('style');
	}

	private calcularTotalTransf(a?: any) {
		this.bloquearBandera(a);
		this.totalProyecto = 0;
		this.diff = 0;
		for (const proyecto of this.proyectos) {
			this.totalProyecto += proyecto.importe;
		}
		this.diff = this.totalProyecto2 - this.totalProyecto;

		if (this.totalProyecto2 < this.totalProyecto) {
			this.bandera = 2;
		}
		if (this.totalProyecto2 > this.totalProyecto) {
			this.bandera = 1;
		}
		if (this.totalProyecto2 === this.totalProyecto) {
			this.bandera = 0;
			if (this.aumentTranf === false) {
				document.getElementById('guardar1').removeAttribute('disabled');
			}
			this.desbloquearBandera();
			// this.guardar();
		}
	}


	private calcularTotalAumento(a?: any) {
		this.totalProyecto = 0;
		this.diff = 0;
		for (const proyecto of this.proyectos) {
			this.totalProyecto += proyecto.importe;
		}
		this.diff = this.totalProyecto2 - this.totalProyecto;

		if (this.totalProyecto2 < this.totalProyecto) {
			this.bandera = 2;
		}
		if (this.totalProyecto2 > this.totalProyecto) {
			this.bandera = 1;
		}
		if (this.totalProyecto2 === this.totalProyecto) {
			this.bandera = 0;
		}

	}

	private bloquearBandera(a?: any) {
		document.getElementById('item' + a).setAttribute('disabled', 'true');
	}

	private desbloquearBandera() {
		let a = 0;
		for (const proyecto of this.proyectos) {
			document.getElementById('item' + a).removeAttribute('disabled');
			a++;
		}
		this.cuentaTabla = false;
		document.getElementById('tabla1').removeAttribute('style');
	}

	private limpiarCampos() {
		this.array2 = [];
		this.presupuestoEgresos.get_presupuesto('1')
		.subscribe((data2: any) => {
			this.array2 = data2.data;
			this.proyectos = this.array2;
		});
		if (this.aumentTranf === false) {
			document.getElementById('guardar1').setAttribute('disabled', 'true');
		}
		this.totalProyecto = 0;
		this.diff = 0;
		this.totalProyecto = this.totalProyecto2;
		this.bandera = 0;
	}

	private guardar() {
		// document.getElementById('guardar').removeAttribute('disabled');
		console.log(this.proyectos);
	}

	private cancelar() {
		this.limpiarCampos();
		this.cuentaTabla = true;
		document.getElementById('tabla1').setAttribute('style', 'display: none');
		this.inicio();
	}


}
