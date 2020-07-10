import { Component, OnInit, ViewChild } from '@angular/core';
import { CambioEgresoService } from '../../../../common/services/presupuesto/cambioEgreso';
import { Router } from '@angular/router';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
// import { distinct } from 'rxjs/operators';
// import { ActivatedRoute } from '@angular/router';
// import { NgForm } from '@angular/forms';


@Component({
	selector: 'app-cambioEgreso',
	templateUrl: './cambioEgreso.component.html',
	styles: []
})
export class CambioEgresoComponent {

	id_pres: number;	
	id_cc: string;
	info_user: any;
	anioEgreso: number;
	centrosAumentosPendientes: any;
	centrosDisminPendientes: any;
	centrosTransfPendientes: any;
	centrosAumentosRevisados: any;
	centrosDisminRevisados: any;
	centrosTransfRevisados: any;
	
	centro: string;	
	presupuestoPropio: any;
	presupuestosHijos: any;
	movimientos: any;	
	banderaTransf: boolean;
	banderaPresupuestosHijos: boolean = false;

	banderaCcAumentosPendientes: boolean = false;
	banderaCcDisminPendientes: boolean = false;
	banderaCcTransfPendientes: boolean = false;
	banderaCcAumentosRevisados: boolean = false;
	banderaCcDisminRevisados: boolean = false;
	banderaCcTransfRevisados: boolean = false;

	banderaMovs: boolean = false;
	banderaSoloImprimir: boolean;

	soyTitFinanzas: boolean;
	
	

	constructor(
		private cambioEgresos: CambioEgresoService,
		private router: Router,
		private mensaje: MensajesService
	) {

		this.id_pres = null;
		this.info_user = JSON.parse(localStorage.getItem('currentUser'));
		if(this.info_user.responsable_ley == true) {
			this.soyTitFinanzas = true;
		} else {
			this.soyTitFinanzas = false;
		}

		// console.log('user', this.info_user);
		
		this.presupuestoPropio = '';
		this.presupuestosHijos = '';
		this.centrosAumentosPendientes = '';
		this.centrosDisminPendientes = '';
		this.centrosTransfPendientes = '';
		this.centrosAumentosRevisados = '';
		this.centrosDisminRevisados = '';
		this.centrosTransfRevisados = '';

		this.cambioEgresos.get_presupuestoActualByCc(this.info_user.id_cc)
		.subscribe((pres: any) => {
			this.presupuestoPropio = pres; 
			// console.log('pres', pres);
		});

		this.cambioEgresos.get_presupuestosActualesHijosCc(this.info_user.id_cc)
		.subscribe((presupuestosHijos: any) => {
			// console.log('Centros hijos', presupuestosHijos);
			if(presupuestosHijos.length > 0) {
				this.presupuestosHijos = presupuestosHijos;
				this.banderaPresupuestosHijos = true;
			} else {
				this.banderaPresupuestosHijos = false;
			}
			
			// console.log('presHijos', presupuestosHijos);
		});
	
		let datos = {
			id_cc: this.info_user.id_cc,
			tipoMov: 1
		};

		this.cambioEgresos.get_centrosHijosConAumentosByCc(datos).subscribe((ccAumentos: any) => {
			if(ccAumentos.length > 0) {
				// console.log('ccAumentos', ccAumentos);
				this.centrosAumentosPendientes = ccAumentos;
				// console.log('Amuentos pendientes', this.centrosAumentosPendientes);
				this.banderaCcAumentosPendientes = true;
			} else {
				this.banderaCcAumentosPendientes = false;
			}			
		});

		this.cambioEgresos.get_centrosHijosConDisminByCc(datos).subscribe((ccDismin: any) => {
			if(ccDismin.length > 0) {
				// console.log('ccDismin', ccDismin);
				this.centrosDisminPendientes = ccDismin;
				// console.log(this.centrosPendientes);
				this.banderaCcDisminPendientes = true;
			} else {
				this.banderaCcDisminPendientes = false;
			}			
		});

		this.cambioEgresos.get_centrosHijosConTransfByCc(datos).subscribe((ccTransf: any) => {
			if(ccTransf.length > 0) {
				// console.log('ccTransf', ccTransf);
				this.centrosTransfPendientes = ccTransf;
				// console.log('Transferencias pendientes', this.centrosTransfPendientes);
				this.banderaCcTransfPendientes = true;
			} else {
				this.banderaCcTransfPendientes = false;
			}			
		});
	}

	aumento() {
		this.router.navigate([`/panel-adm/aumentoDisminucion`]);
	}

	transferir() {
		this.router.navigate([`/panel-adm/transferir`]);
	}

	mostrarProyectos() {
		const bandera = true;
		this.router.navigate([`/panel-adm/mod_proyectos/${this.presupuestoPropio.id}/proyectos/${bandera}`]);
	}

	mostrarInfo(id: string) {
		const bandera = true;
		this.router.navigate([`/panel-adm/pres_egresos/${id}/${bandera}`]);
	}

	// ** ** //

	mostrarAumentos(id_cc: string) {		

		this.banderaTransf = false;
		let datos = {
			id_cc: id_cc,
			tipoMov: 1
		};
		this.cambioEgresos.get_aumentos_by_cc(datos).subscribe((aumentos: any) => {
			// console.log('movimeintos pendientes', aumentos.data);
			if(aumentos.data.length > 0) {
				this.movimientos = aumentos.data;
				this.banderaMovs = true;
			} else {
				this.banderaMovs = false;				
			}
		});
	}

	mostrarDisminuciones(id_cc: string) {
		/* if(this.info_user.id_nivel != null && this.info_user.id_nivel != 1) {
			if(this.info_user.id_cc == Number(id_cc)) {
				this.banderaSoloImprimir = true;
				console.log('disminucion imprimir1', this.banderaSoloImprimir);
			} else {
				this.banderaSoloImprimir = false;
				console.log('disminucion imprimir1', this.banderaSoloImprimir);
			}			
		}
		else {
			this.banderaSoloImprimir = false;
		} */

		this.banderaTransf = false;
		let datos = {
			id_cc: id_cc,
			tipoMov: 1
		};
		this.cambioEgresos.get_disminuciones_by_cc(datos).subscribe((disminuciones: any) => {
			// console.log('movimeintos pendientes', movs.data);
			if(disminuciones.data.length > 0) {
				this.movimientos = disminuciones.data;
				this.banderaMovs = true;
			} else {
				this.banderaMovs = false;				
			}
		});
	}

	mostrarTransferencias(id_cc: string) {		
		/* if(this.info_user.id_nivel != null && this.info_user.id_nivel != 1) {
			if(this.info_user.id_cc == Number(id_cc)) {
				this.banderaSoloImprimir = true;
				console.log('Tranf imprimir1', this.banderaSoloImprimir);
			} else {
				this.banderaSoloImprimir = false;
				console.log('Tranf imprimir1', this.banderaSoloImprimir);
			}			
		}
		else {
			this.banderaSoloImprimir = false;
		} */

		this.banderaTransf = true;
		let datos = {
			id_cc: id_cc,
			tipoMov: 1
		};
		this.cambioEgresos.get_transferencias_by_cc(datos).subscribe((tansferencias: any) => {
			// console.log('movimeintos pendientes', tansferencias.data);
			if(tansferencias.data.length > 0) {
				this.movimientos = tansferencias.data;
				this.banderaMovs = true;
			} else {
				this.banderaMovs = false;				
			}
		});	
		// console.log(this.centrosAumentosPendientes);
		// console.log(this.centrosTransfPendientes);
	}

	// ** ** //

	validarCentrosRevisados() {
		let datos = {
			id_cc: this.info_user.id_cc,
			tipoMov: 2
		};

		this.cambioEgresos.get_centrosHijosConAumentosByCc(datos).subscribe((ccAumentos: any) => {
			if(ccAumentos.length > 0) {
				// console.log('ccAumentos', ccAumentos);
				this.centrosAumentosRevisados = ccAumentos;
				// console.log('Amuentos pendientes', this.centrosAumentosRevisados);
				this.banderaCcAumentosRevisados = true;
			} else {
				this.banderaCcAumentosRevisados = false;
			}			
		});

		this.cambioEgresos.get_centrosHijosConDisminByCc(datos).subscribe((ccDismin: any) => {
			if(ccDismin.length > 0) {
				// console.log('ccDismin', ccDismin);
				this.centrosDisminRevisados = ccDismin;
				// console.log(this.centrosPendientes);
				this.banderaCcDisminRevisados = true;
			} else {
				this.banderaCcDisminRevisados = false;
			}			
		});

		this.cambioEgresos.get_centrosHijosConTransfByCc(datos).subscribe((ccTransf: any) => {
			if(ccTransf.length > 0) {
				// console.log('ccTransf', ccTransf);
				this.centrosTransfRevisados	 = ccTransf;
				// console.log('Transferencias pendientes', this.centrosTransfRevisados);
				this.banderaCcTransfRevisados = true;
			} else {
				this.banderaCcTransfRevisados = false;
			}			
		});
	}

	mostrarAumentosRevisados(id_cc: string) {
		/* if(this.info_user.id_nivel != null && this.info_user.id_nivel != 1) {
			if(this.info_user.id_cc == Number(id_cc)) {
				this.banderaSoloImprimir = true;
				console.log('imprimir1', this.banderaSoloImprimir);
			} else {
				this.banderaSoloImprimir = false;
				console.log('imprimir1', this.banderaSoloImprimir);
			}			
		} 
		else {
			this.banderaSoloImprimir = false;
		}*/

		this.banderaSoloImprimir = true;
		this.banderaTransf = false;// validar si fue transferencia
		let datos = {
			id_cc: id_cc,
			tipoMov: 2
		};		
		this.cambioEgresos.get_aumentos_by_cc(datos).subscribe((aumentos: any) => {
			// console.log('movimeintos pendientes', movs.data);
			if(aumentos.data.length > 0) {
				this.movimientos = aumentos.data;
				this.banderaMovs = true;
			} else {
				this.banderaMovs = false;				
			}
		});
	}

	mostrarDisminRevisados(id_cc: string) {
		
		this.banderaSoloImprimir = true;
		this.banderaTransf = false;
		let datos = {
			id_cc: id_cc,
			tipoMov: 2
		};
		this.cambioEgresos.get_disminuciones_by_cc(datos).subscribe((disminuciones: any) => {
			// console.log('movimeintos pendientes', movs.data);
			if(disminuciones.data.length > 0) {
				this.movimientos = disminuciones.data;
				this.banderaMovs = true;
			} else {
				this.banderaMovs = false;				
			}
		});
	}

	mostrarTransfRevisados(id_cc: string) {		
		
		this.banderaSoloImprimir = true;
		this.banderaTransf = true;
		let datos = {
			id_cc: id_cc,
			tipoMov: 2
		};
		this.cambioEgresos.get_transferencias_by_cc(datos).subscribe((tansferencias: any) => {
			// console.log('movimeintos pendientes', tansferencias.data);
			if(tansferencias.data.length > 0) {
				this.movimientos = tansferencias.data;
				this.banderaMovs = true;
			} else {
				this.banderaMovs = false;				
			}
		});	
		// console.log(this.centrosAumentosPendientes);
		// console.log(this.centrosTransfPendientes);
	}

	// ** ** //

	aprobarMovimiento() {

	}

	rechazarMovimiento() {

	}

	cancelar() {
		this.router.navigate([`/panel-adm/`]);
	}


}
