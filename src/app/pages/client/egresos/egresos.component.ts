import { Component, ViewChild, Inject } from '@angular/core';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { PeService } from 'src/app/common/services/pe/pe.service';
import { Router } from '@angular/router';
import { UiComponent } from '../../../components/classification/unidadesInternas/ui.component';
import { Presupuesto } from 'src/app/common/interfaces/presupuesto.interface';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {
	@ViewChild(UiComponent) ui_component: UiComponent;
	/* -- Unidades internas | clas administrativa -- */
	ui_keys = ['0', '0'];
	ui_data: any;
	presupuestos: any = [];
	presupuesto: Presupuesto = {
		id_centro_costo: '',
		nombre: '',
		anio: null
	};
	anioActual: number = new Date().getFullYear();
	anioSiguiente: number = this.anioActual + 1;

	showModal = false;

	constructor(
		@Inject(DOCUMENT) private _document,
		private mensaje: MensajesService,
		private pe_service: PeService,
		private router: Router
		) {}


	mostrarProyectos( id_presupuesto: string) {
		this.router.navigate([`/panel-adm/pres_egresos/${id_presupuesto}/proyectos`]);
	}

	getPresupuestos() {
		this.pe_service.get_presupuestos_cc(this.ui_data.id_ccosto)
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

		this.pe_service.create_presupuesto(this.presupuesto)
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

		if (this.presupuestos.length === 0) {
			this.showModal = true;
		} else {
			this.presupuestos.forEach(element => {
				if ( element.anio > anio ) {
					anio = element.anio;
				}
			});
			this.crearPresupuesto(anio + 1);
		}

		this.getPresupuestos();
	}
}
