
import { Component } from '@angular/core';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { PresupuestoEgresoService } from '../../../common/services/presupuesto/egreso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JspdfPresupuestoEgresoGeneral } from '../../../Arquitecture/pdfs/JspdfPresupuestoEgresoGeneral';
import { JspdfClasificacionPresupuestoEgreso } from '../../../Arquitecture/pdfs/jsPDFClasificacionPresupuestoegreso';

@Component ({
	selector: 'app-egreso',
	templateUrl: './egreso.component.html',
	styles: []
})

export class EgresoComponent {

	mensajeAlert = '';
	mensajeAlertHijo = '';
	id_egreso: string;
	centrosCostos: any = [];
	egresoPropioPrincipal: any = '';

	/* PRESUPUESTO PROPIO */
	datosEgreso: any[];
	totalPropio = 0;

	/* PRESUPUESTO GENERAL */
	datosEgresoGeneral: any[] = null;
	totalGeneral: number;

	/* PRESUPUESTO HIJO */
	datosEgresoGeneralHijo: any = [];
	totalGeneralHijo = 0;

	mostrarOpciones = false;
	clasificaciones: any[] = [];
	titleClasf = 'Clasificación Objeto de Gasto';

	infoModEgreso: boolean = false;

	datosEmpresa:any;
	// totalClasificacion: number;
	// loading: boolean = false;

	constructor(
		private mensaje: MensajesService,
		private ccosto_service: CcostoService,
		private presupuestoEgresos: PresupuestoEgresoService,
		private activateRoute: ActivatedRoute,
		private router: Router
	) {
		this.activateRoute.params.subscribe(params => {
			this.id_egreso = params['id_presupuesto'];
			this.infoModEgreso = params['bandera'];
			console.log('infoModEgreso', this.infoModEgreso);
			this.get_presupuestoId(this.id_egreso);
			this.getDatosPresupuesto(this.id_egreso);
		});
		this.datosEmpresaPorIdCentroCosto();
	}

	private getDatosPresupuesto($id_presupuesto: string) {
		this.presupuestoEgresos.get_presupuesto($id_presupuesto)
			.subscribe((data: any) => {
				this.datosEgreso = data.data;
				this.totalPropio = this.datosEgreso.reduce((contador, egreso) => contador + parseFloat(egreso.importe), 0);
			}, error => {
				this.mensajeAlert = error.error.message;
			});
	}

	private getCCentroHijos(id_centro_costo) {
		this.ccosto_service.getCentrosCostoHijos(id_centro_costo)
			.subscribe((centroCostos: any) => {
				// console.log(centroCostos);
				this.centrosCostos = centroCostos.data;
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	private get_presupuestoId(id_egreso) {
		this.presupuestoEgresos.get_presupuestoId(id_egreso)
			.subscribe((egreso: any) => {
				// console.log(egreso.data);
				this.egresoPropioPrincipal = egreso.data;
				this.get_presupuesto_egresos_general(this.egresoPropioPrincipal.id_centro_costo, this.egresoPropioPrincipal.anio);
				this.getCCentroHijos(this.egresoPropioPrincipal.id_centro_costo);
				this.buscarPresupuestoPorClasificacion('ClasfObjGasto');
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	private get_presupuesto_egresos_general(id_centro_costo, anio) {
		this.presupuestoEgresos.get_presupuesto_egresos_general(id_centro_costo, anio)
			.subscribe((egresos: any) => {
				// console.log(egresos.data);
				this.datosEgresoGeneral = egresos.data;
				this.totalGeneral = this.datosEgresoGeneral.reduce(( contador, egreso )  => contador + parseFloat(egreso.importe), 0);
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
							this.totalGeneralHijo = this.datosEgresoGeneralHijo.reduce((contador, data) => contador + parseFloat(data.importe), 0);

							if ((egreso.estado === 'Revisión' )) {
								this.mostrarOpciones = true;
							}
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

	public getFormatFont(datoEgreso) {
		if (datoEgreso === 'N/A') {
			return 'text-danger text-center font-weight-bolder';
		}
	}

	public autorizarPresupuesto(id_centro_costo) {

		this.presupuestoEgresos.get_aprobar_egreso(id_centro_costo, this.egresoPropioPrincipal.anio)
			.subscribe((data: any) => {

				this.mensaje.success(data);
				this.get_presupuesto_egresos_general( this.egresoPropioPrincipal.id_centro_costo, this.egresoPropioPrincipal.anio);
				this.get_presupuesto_egresos_general_hijos(id_centro_costo, this.egresoPropioPrincipal.anio);

			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	public rechazarPresupuesto() {
		// console.log('Rechazar');
		// this.presupuestoEgresos.get_aprobar_egreso(this.id_egreso)
		// .subscribe((egresos: any) => {
		// 	// console.log(egresos.data);
		// 	// this.datosEgresoGeneralHijo = egresos.data;
		// }, error => {
		// 	this.mensaje.danger(error.error);
		// });
	}

	regresar() {
		if(this.infoModEgreso) {
			this.router.navigate([`/panel-adm/modificar_egreso`]);
		} else {
			this.router.navigate([`/panel-adm/pres_egresos`]);
		}
	}

	public buscarPresupuestoPorClasificacion(clasificacion: string, titleClasf: string = null) {
		if (titleClasf) {
			this.titleClasf = titleClasf;

		}

		this.presupuestoEgresos.get_presupuesto_egreso_por_clasificacion(clasificacion, this.egresoPropioPrincipal)
		.subscribe((resp: any) => {
			this.clasificaciones = resp.data;
		}, error => {
			this.mensaje.danger(error.error);
		});

	}

	public downloadPresupuestoEgresoPDF() {
		const doc = new JspdfPresupuestoEgresoGeneral(this.datosEmpresa, this.datosEgresoGeneral, this.egresoPropioPrincipal);
		doc.dowload();
	}

	public seePresupuestoEgresoPDF() {
		const doc = new JspdfPresupuestoEgresoGeneral(this.datosEmpresa, this.datosEgresoGeneral, this.egresoPropioPrincipal);
		doc.show();
	}

	public downloadClasificacionPDF() {
		const doc = new JspdfClasificacionPresupuestoEgreso(this.datosEmpresa, this.clasificaciones, this.egresoPropioPrincipal, this.titleClasf);

		doc.dowload('PresupuestoEgreso' + this.egresoPropioPrincipal.anio + this.egresoPropioPrincipal.nombre_centro_costo);
	}

	public seeClasificacionPDF() {
		const doc = new JspdfClasificacionPresupuestoEgreso(this.datosEmpresa, this.clasificaciones, this.egresoPropioPrincipal, this.titleClasf);
		doc.show();
	}

	public datosEmpresaPorIdCentroCosto() {
		const user = JSON.parse(localStorage.getItem('currentUser'));

		this.ccosto_service.getInfoEmpresaPorCentroCosto(user.id_cc)
			.subscribe((informacion: any) => {
				this.datosEmpresa = informacion.data;
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

}
