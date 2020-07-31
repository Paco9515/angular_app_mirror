
import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { PresupuestoEgresoService } from '../../../common/services/presupuesto/egreso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JspdfPresupuestoEgresoGeneral } from '../../../Arquitecture/pdfs/JspdfPresupuestoEgresoGeneral';
import { JspdfClasificacionPresupuestoEgreso } from '../../../Arquitecture/pdfs/jsPDFClasificacionPresupuestoegreso';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component ({
	selector: 'app-egreso',
	templateUrl: './egreso.component.html',
	styles: []
})

export class EgresoComponent implements OnInit{
	readonly _url = 'http://localhost:8000';

	mensajeAlert = '';
	mensajeAlertHijo = '';
	centrosCostos: any = [];
	egresoPropioPrincipal: any = '';

	/* PRESUPUESTO PROPIO */
	datosEgreso: any[];

	/* PRESUPUESTO GENERAL */
	datosEgresoGeneral: any[] = null;

	/* PRESUPUESTO HIJO */
	datosEgresoGeneralHijo: any = [];

	mostrarOpciones = false;
	clasificaciones: any[] = [];
	titleClasf = 'Clasificación Objeto de Gasto';

	infoModEgreso = false;
	seeCsv = false;

	datosEmpresa: any;

	fileUrl;
	fileUrlpdf;
	// totalClasificacion: number;
	// loading: boolean = false;

	constructor(
		private mensaje: MensajesService,
		private ccosto_service: CcostoService,
		private presupuestoEgresos: PresupuestoEgresoService,
		private activateRoute: ActivatedRoute,
		private router: Router,
		private http: HttpClient,
		private sanitizer: DomSanitizer
	) {
		this.activateRoute.params.subscribe(params => {
			const id_egreso = params.id_presupuesto;
			this.infoModEgreso = params.bandera;

			// console.log('infoModEgreso', this.infoModEgreso);
			this.get_presupuestoId(id_egreso);
			this.getDatosPresupuesto(id_egreso);
		});
		this.datosEmpresaPorIdCentroCosto();
		


	}

	ngOnInit() {
		/*const data = 'some text';
    	const blob = new Blob([data], { type: 'application/octet-stream' });

		this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));*/
	
		// this.pdf();
	}

	private getDatosPresupuesto($id_presupuesto: string) {
		this.presupuestoEgresos.get_presupuesto($id_presupuesto)
			.subscribe((data: any) => {
				this.datosEgreso = data.data;
			}, error => {
				this.mensajeAlert = error.error.message;
			});
	}

	private getCCentroHijos(id_centro_costo) {
		this.ccosto_service.getCentrosCostoHijos(id_centro_costo)
			.subscribe((centroCostos: any) => {
				console.log('centros: ', centroCostos);
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
				const user = JSON.parse(localStorage.getItem('currentUser'));
				this.csv(user.id_cc, this.egresoPropioPrincipal.anio);
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
				this.datosEgresoGeneral = egresos.data;
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	public get_presupuesto_egresos_general_hijos(id_centro_costo, anio: number) {
		this.datosEgresoGeneralHijo = [];
		this.presupuestoEgresos.get_presupuestoEgreso_por_centro_anio(id_centro_costo, anio)
			.subscribe((egreso: any) => {
				// console.log('egreso: ', egreso);
				this.mostrarOpciones = false;
				egreso = egreso.data;
				if (egreso.estado !== 'Capturando') {
					this.presupuestoEgresos.get_presupuesto_egresos_general(id_centro_costo, anio)
						.subscribe((egresos: any) => {
							// console.log('egresos: ', egresos);
							this.datosEgresoGeneralHijo = egresos.data;

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
		if (this.infoModEgreso) {
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

	public getRequest(url: string, tipo: string, data: any) {


		return this.http.get(this._url + url, {responseType: 'text'});
		// .pipe(
		//   tap( // Log the result or error
		// 	data => data,

		// 	error => {
		// 		const errors = error.error;
		// 		if(errors.code == 404) {
		// 			this.seeCsv = false;
		// 		}
		// 		this.mensaje.danger(JSON.parse(error.error))
		// 	}
		//   )
		// );

	}

	getPdf(id_centro_costo: string, anio: number) {

		// this.authKey = localStorage.getItem('jwt_token');

		const httpOptions = {
		  responseType: 'blob' as 'json',
		//   headers: new HttpHeaders({
			// 'Authorization': this.authKey,
		//   })
		};

		return this.http.get(this._url + `/get_pdf_presupuesto_egresos_general/${id_centro_costo}/${anio}`, httpOptions);
	  }

	csv(id_centro_costo: number, anio: number) {

		this.getRequest(`/get_csv_presupuesto_egresos_general/${id_centro_costo}/${anio}`, 'get', false)
			.subscribe( results => {
				const blob = new Blob([results], { type: 'application/csv' });
				this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
				this.seeCsv = true;
			}, error => {
				const errors = JSON.parse(error.error);
				if (errors.code === 404) {
					return this.seeCsv = false;
				}
				return this.mensaje.danger(errors);
			});
	}

	pdf(id_centro_costo: string, anio: number) {

		this.getPdf(id_centro_costo, anio).subscribe((data: any) => {

			const blob = new Blob([data], {type: 'application/pdf'});

			this.fileUrlpdf = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

		});
	}

}
