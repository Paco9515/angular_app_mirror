import { Component, ɵConsole } from '@angular/core';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { PresupuestoEgresoService } from '../../../common/services/presupuesto/egreso.service';
import { ActivatedRoute } from '@angular/router';

@Component ({
	selector: 'app-egreso',
	templateUrl: './egreso.component.html',
	styles: []
})

export class EgresoComponent  {
	
	mensajeAlert: string = '';
	mensajeAlertHijo: string = '';
	id_egreso: string;
	centrosCostos: any = [];
	egresoPropioPrincipal: any = '';

	/* PRESUPUESTO PROPIO */
	datosEgreso: any[];
	totalPropio: number = 0;
	
	/* PRESUPUESTO GENERAL */
	datosEgresoGeneral: any = null;
	totalGeneral: number;

	/* PRESUPUESTO HIJO */
	datosEgresoGeneralHijo: any = [];
	totalGeneralHijo: number = 0;

	mostrarOpciones:boolean = false;


	constructor(
		private mensaje: MensajesService,
		private ccosto_service: CcostoService,
		private presupuestoEgresos: PresupuestoEgresoService,
		private activateRoute: ActivatedRoute,
	) {
		this.activateRoute.params.subscribe(params => {
			this.id_egreso = params['id_presupuesto'];
			this.get_presupuestoId(this.id_egreso);
			this.getDatosPresupuesto(this.id_egreso);
		});
	}

	private getDatosPresupuesto($id_presupuesto: string) {
		this.presupuestoEgresos.get_presupuesto($id_presupuesto)
			.subscribe((data: any) => {
				this.datosEgreso = data.data;
				this.totalPropio = this.datosEgreso.reduce((contador, egreso) => contador + parseInt(egreso.importe), 0);
			}, error => {
				this.mensajeAlert = error.error.message;
			});
	}

	private getCCentroHijos(id_centro_costo){
		this.ccosto_service.getCentrosCostoHijos(id_centro_costo)
			.subscribe((centroCostos: any) => {
				// console.log(centroCostos);
				this.centrosCostos = centroCostos.data; 
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	private get_presupuestoId(id_egreso){
		this.presupuestoEgresos.get_presupuestoId(id_egreso)
			.subscribe((egreso: any) => {
				// console.log(egreso.data);
				this.egresoPropioPrincipal = egreso.data;
				this.get_presupuesto_egresos_general(this.egresoPropioPrincipal.id_centro_costo, this.egresoPropioPrincipal.anio);
				this.getCCentroHijos(this.egresoPropioPrincipal.id_centro_costo);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	private get_presupuesto_egresos_general(id_centro_costo, anio){
		this.presupuestoEgresos.get_presupuesto_egresos_general(id_centro_costo, anio)
			.subscribe((egresos: any) => {
				// console.log(egresos.data);
				this.datosEgresoGeneral = egresos.data; 
				this.totalGeneral = this.datosEgresoGeneral.reduce(( contador, egreso )  => contador + parseInt(egreso.importe), 0);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	public get_presupuesto_egresos_general_hijos(id_centro_costo, anio: number) {
		this.datosEgresoGeneralHijo = []; 
		this.presupuestoEgresos.get_presupuestoEgreso_por_centro_anio(id_centro_costo, anio)
			.subscribe((egreso: any) => {
				// console.log(egreso);
				this.mostrarOpciones = false;
				egreso = egreso.data;
				if (egreso.estado !== 'Capturando') {
					this.presupuestoEgresos.get_presupuesto_egresos_general(id_centro_costo, anio)
						.subscribe((egresos: any) => {
							this.datosEgresoGeneralHijo = egresos.data; 
							this.totalGeneralHijo = this.datosEgresoGeneralHijo.reduce((contador, egreso) => contador + parseInt(egreso.importe), 0);
							(egreso.estado == 'Revisión' ) ?  this.mostrarOpciones = true : null;
						}, error => {
							this.mensaje.danger(error.error);
						});
					} else {
						this.mensajeAlertHijo = 'El presupuesto de egreso no ha sido enviado por el centro de costo';
					}
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	public getFormatFont(datoEgreso){
		if(datoEgreso === 'N/A')
			return 'text-danger text-center font-weight-bolder';
	}

	public autorizarPresupuesto(id_centro_costo) {
		// console.log('Rechazar');
		// console.log(this.egresoPropioPrincipal);
		
		this.presupuestoEgresos.get_aprobar_egreso(id_centro_costo, this.egresoPropioPrincipal.anio)
			.subscribe((data: any) => {
				// console.log(egresos.data);
				this.mensaje.success(data);
				this.get_presupuesto_egresos_general( this.egresoPropioPrincipal.id_centro_costo, this.egresoPropioPrincipal.anio);
				this.get_presupuesto_egresos_general_hijos(id_centro_costo, this.egresoPropioPrincipal.anio);
				// console.log(this.datosEgresoGeneralHijo);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	public rechazarPresupuesto(){
		// console.log('Rechazar');
		// this.presupuestoEgresos.get_aprobar_egreso(this.id_egreso)
		// .subscribe((egresos: any) => {
		// 	// console.log(egresos.data);
		// 	// this.datosEgresoGeneralHijo = egresos.data; 
		// }, error => {
		// 	this.mensaje.danger(error.error);
		// });
	}
}