import { Component, OnInit } from '@angular/core';
import { CambioEgresoService } from '../../../../../common/services/presupuesto/cambioEgreso';
import { Router } from '@angular/router';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';
// import { distinct } from 'rxjs/operators';
// import { ActivatedRoute } from '@angular/router';
// import { NgForm } from '@angular/forms';


@Component({
	selector: 'app-movimientosEgresos',
	templateUrl: './movimientosEgresos.component.html',
	styles: []
})
export class movimientosEgresosComponent {

	
	id_pres: number;
	anioEgreso: number;
	info_user: any;
	centros: any;
	centro: string;	
	presupuestoPropio: any;
	presupuestosHijos: any;
	banderaPresupuestosHijos: boolean = false;
	banderaCentros: boolean = false;
	

	constructor(
		private cambioEgresos: CambioEgresoService,
		private router: Router,
		private mensaje: MensajesService
	) {

		this.id_pres = null;
		this.info_user = JSON.parse(localStorage.getItem('currentUser'));
		// console.log('user', this.info_user);
		this.presupuestoPropio = '';
		this.presupuestosHijos = '';
		
		
		this.cambioEgresos.get_presupuestoActualByCc(this.info_user.id_cc)
		.subscribe((pres: any) => {
			this.presupuestoPropio = pres; 
			// console.log('pres', pres);
		});

		this.cambioEgresos.get_presupuestosActualesHijosCc(this.info_user.id_cc)
		.subscribe((presupuestosHijos: any) => {
			if(presupuestosHijos.length > 0) {
				this.presupuestosHijos = presupuestosHijos;
				this.banderaPresupuestosHijos = true;
			} else {
				this.banderaPresupuestosHijos = false;
			}
			
			// console.log('presHijos', presupuestosHijos);
		});

		/* this.cambioEgresos.get_movimientosHijosBycc(this.info_user).subscribe((ccMovs: any) => {
			if(ccMovs.length > 0) {
				console.log('centros mov hijos', ccMovs);
				this.centros = ccMovs;
				this.banderaCentros = true;
			} else {
				this.banderaCentros = false;
			}			
		}); */
	}

	aumento() {
		this.router.navigate([`/panel-adm/aumentoDisminucion`]);
	}

	transferir() {
		this.router.navigate([`/panel-adm/transferir`]);
	}

	
	// Redireccion a proyectos
	mostrarProyectos() {
		const bandera = true;
		this.router.navigate([`/panel-adm/mod_proyectos/${this.presupuestoPropio.id}/proyectos/${bandera}`]);
	}

	mostrarInfo(id: string) {
		const bandera = true;
		this.router.navigate([`/panel-adm/pres_egresos/${id}/${bandera}`]);
	}

	mostrarMovs(id_cc: string) {
		// ya veremos
	}

	cancelar() {
		this.router.navigate([`/panel-adm/`]);
	}


}
