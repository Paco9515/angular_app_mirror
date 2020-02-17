import { Component, ViewChild } from '@angular/core';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { PresupuestoEgresoService } from 'src/app/common/services/presupuesto/egreso.service';
import { Router } from '@angular/router';
import { UiComponent } from '../../../components/classification/unidadesInternas/ui.component';
import { PresupuestoEgreso } from 'src/app/common/interfaces/presupuesto.interface';


@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {
	@ViewChild(UiComponent, { static: true }) ui_component: UiComponent;
	/* -- Unidades internas | clas administrativa -- */
	ui_keys = ['0', '0'];
	ui_data: any;
	presupuestos: any = [];
	presupuesto: PresupuestoEgreso = {
		id_centro_costo: '',
		nombre: '',
		estado: null,
		anio: null
	};
	anioActual: number = new Date().getFullYear();
	anioSiguiente: number = this.anioActual + 1;
	showModal = false;

	constructor(
		private mensaje: MensajesService,
		private egreso_service: PresupuestoEgresoService,
		private router: Router
		) {}

	mostrarProyectos( id_presupuesto: string) {
		this.router.navigate([`/panel-adm/pres_egresos/${id_presupuesto}/proyectos`]);
	}

	getPresupuestos() {
		this.egreso_service.get_presupuestos_cc(this.ui_data.id_ccosto)
		.subscribe((presupuestos: any) => {
			if (presupuestos !== []) {
				this.presupuestos = presupuestos;
			}
		});
	}

	/* -- Unidades internas -- */
	getDataUI(data: any) {
		this.ui_data = data;
		if (this.ui_data.id_ccosto !== '0' && this.ui_data.id_ccosto !== null && this.ui_data.id_ccosto !== '') {
			this.getPresupuestos();
		}
	}

	crearPresupuesto(anio) {
		this.presupuesto = {
			id_centro_costo: this.ui_data.id_ccosto,
			anio: anio
		};

		this.egreso_service.create_presupuesto(this.presupuesto)
			.subscribe((data: any) => {
				this.mensaje.success(data);
				this.getPresupuestos();
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	showModel() {
		this.showModal = false;
		let anio: number = 0;
		let anioActualExiste:boolean = false;

		if (this.presupuestos.length === 0) {
			this.showModal = true;
		} else {
			this.presupuestos.forEach(presupuesto => {
				if( presupuesto.anio > anio ) {
					anio = presupuesto.anio;
				}
				if(presupuesto.anio == this.anioActual){
					anioActualExiste = true; 
				}
			});

			if(anioActualExiste){
				this.crearPresupuesto(anio + 1);
			} else {
				this.showModal = true
				this.anioSiguiente = anio + 1;
			}
		}
		this.getPresupuestos();
	}
}
