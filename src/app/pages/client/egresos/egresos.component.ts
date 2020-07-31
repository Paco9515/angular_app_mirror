import { Component } from '@angular/core';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { PresupuestoEgresoService } from 'src/app/common/services/presupuesto/egreso.service';
import { Router } from '@angular/router';
import { PresupuestoEgreso } from 'src/app/common/interfaces/presupuesto.interface';
import { Usuario } from 'src/app/common/interfaces/usuario.interface';

@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {

	presupuestos: any = [];
	usuario: any;

	presupuesto: PresupuestoEgreso = {
		id_centro_costo: '',
		nombre_centro_costo: '',
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
	) {
		this.usuario = JSON.parse(localStorage.getItem('currentUser'));
		this.getPresupuestos();
	}

	mostrarProyectos( id_presupuesto: number) {
		this.router.navigate([`/panel-adm/pres_egresos/${id_presupuesto}/proyectos`]);
	}

	getPresupuestos() {
		this.egreso_service.get_presupuestos_cc(this.usuario.id_cc)
		.subscribe((presupuestos: any) => {

			if (presupuestos.data !== []) {
				this.presupuestos = presupuestos.data;
				let ultimoAnio = 0;
				this.presupuestos.filter(egreso => {
					if (ultimoAnio > egreso.anio) {
						ultimoAnio = egreso.anio;
						return egreso;
					}
				});
			}
		}, error => {
			const errors = error.error;
			if (errors.code === 404) {
				this.mensaje.warning(errors);
			}
		});
	}

	crearPresupuesto(anio: number) {
		this.presupuesto = {
			id_centro_costo: this.usuario.id_cc,
			anio
		};

		this.egreso_service.create_presupuesto(this.presupuesto)
			.subscribe((data: any) => {
				this.mensaje.success(data);
				this.getPresupuestos();
			}, error => {
				console.error(error.error);
				// const capturarError: any = error.error;
				// if (capturarError.code === 422) {
				// 	console.error(capturarError);
				// 	return;
				// }
				// this.mensaje.danger(error.error);
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
				if(presupuesto.anio === this.anioActual) {
					anioActualExiste = true;
				}
			});

			if (anioActualExiste){
				this.crearPresupuesto(anio + 1);
			} else {
				this.showModal = true;
				this.anioSiguiente = anio + 1;
			}
		}
		// this.getPresupuestos();
	}

	enviarAEvaluar(id_egreso){
		this.egreso_service.get_enviar_a_evacuacion_egreso_por_superior(id_egreso)
			.subscribe((egreso: any) => {
				this.mensaje.success(egreso);
				this.getPresupuestos();
			}, error => {
				this.mensaje.danger(error.error);
				// console.log();
			});
	}

}
