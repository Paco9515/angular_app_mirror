import { Component } from '@angular/core';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { PresupuestoEgresoService } from '../../../common/services/presupuesto/egreso.service';
import { PDFService } from '../../../common/services/PDFs/PDF.service';
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
	datosEgresoGeneral: any[] = null;
	totalGeneral: number;

	/* PRESUPUESTO HIJO */
	datosEgresoGeneralHijo: any = [];
	totalGeneralHijo: number = 0;

	mostrarOpciones: boolean = false;
	clasificaciones: any[] = [];
	// totalClasificacion: number;
	// loading: boolean = false;

	constructor(
		private mensaje: MensajesService,
		private ccosto_service: CcostoService,
		private presupuestoEgresos: PresupuestoEgresoService,
		private activateRoute: ActivatedRoute,
		private pdf: PDFService
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
				this.buscarPresupuestoPorClasificacion('ClasfObjGasto');
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

	public buscarPresupuestoPorClasificacion(clasificacion: string) {
		// console.log('Rechazar');
		this.presupuestoEgresos.get_presupuetso_egreso_por_clasificacion(clasificacion, this.egresoPropioPrincipal.id_centro_costo, this.egresoPropioPrincipal.anio )
		.subscribe((clasificacion: any) => {
			// console.log(clasificacion.data);
			this.clasificaciones = clasificacion.data; 
		}, error => {
			this.mensaje.danger(error.error);
		});

	}

	public descargarPDF() {
		let doc = this.pdfPresupuestoEgresoGeneral();
		doc.dowloadPDF('PresupuestoEgreso' + this.egresoPropioPrincipal.anio + this.egresoPropioPrincipal.nombre_centro_costo);
	}

	public verPDF() {
		let doc = this.pdfPresupuestoEgresoGeneral();
		doc.seePDF();
	}

	public pdfPresupuestoEgresoGeneral() {

		let datosEmpresa: any = {
			nombre_comercial: 'Casa Magna Marriott Puerto Vallarta Resort & SPA. S.A. de C.V',
			rfc: 'xxxxxxxx',
			imss_sar: 'xxxxxxxx',
			reg_estatal: 'xxxxxxxx',
			calle: 'Ramón y Caja',
			nombre_asentamiento: 'Jaimito',
			num_exterior: '270',
			codigo_postal: 'xxxxxxxxxx',
			nombre_municipio: 'Guadalajara',
			nombre_estado: 'Jalisco',
		};

		let title: string = 'Presupuesto de egreso' + this.egresoPropioPrincipal.anio + ' (' + this.egresoPropioPrincipal.nombre_centro_costo + ')';
		let headTable = this.headTablePresupuestoEgresoGeneral(title);
		let bodyTable = this.bodyTablePresupuestoEgresoGeneral(this.datosEgresoGeneral);
		let footTable = this.footerTablePresupuestoEgresoGeneral(this.datosEgresoGeneral, 23);

		let doc = new PDFService;
		doc.buildPDF('l', 'tabloid');
		doc.createTable(headTable, bodyTable, footTable);
		doc.addPage();
		// ESTA FUNCION SE LLAMA AL FINAL PARA QUE COLOQUE EL HEADER Y EL FOOTER EN TODAS LAS PAGINAS QUE SE REALICEN 
		doc.headerFooterPage(datosEmpresa);

		return doc;
	}

	private headTablePresupuestoEgresoGeneral(title: string) {

		return [
			[
				{ title: title, colSpan: 24, styles: { fontSize: 12 } }
			],
			[
				{ title: 'Nº', rowSpan: 5 },
				{ title: 'Año', rowSpan: 5 },
				{ title: 'Centro Costo', colSpan: 22 }
			],
			[
				{ title: 'Código', rowSpan: 4 },
				{ title: 'Nombre', rowSpan: 4 },
				{ title: 'Proyectos', colSpan: 20 }
			],
			[
				{ title: 'Código', rowSpan: 3 },
				{ title: 'Nombre', rowSpan: 3 },
				{ title: 'Fecha Inicio', rowSpan: 3 },
				{ title: 'Fecha Final', rowSpan: 3 },
				{ title: 'Subprograma', colSpan: 2 },
				{ title: 'Fase', colSpan: 14 }
			],
			[
				{ title: 'Código', rowSpan: 2 },
				{ title: 'Nombre', rowSpan: 2 },
				{ title: 'Código', rowSpan: 2 },
				{ title: 'Nombre', rowSpan: 2 },
				{ title: 'Descripción', rowSpan: 2 },
				{ title: 'Tipo FF', colSpan: 2 },
				{ title: 'Ubicación Geográfica', colSpan: 6 },
				{ title: 'Partida', colSpan: 3 },
			],
			[
				{ title: 'Código' },
				{ title: 'Nombre' },
				{ title: 'Estado' },
				{ title: 'Municipio' },
				{ title: 'Código Postal' },
				{ title: 'Asentamiento' },
				{ title: 'Tipo Asentamiento' },
				{ title: 'Domicilio' },
				{ title: 'Código' },
				{ title: 'Nombre' },
				{ title: 'Importe' },
			]
		];
	}

	private bodyTablePresupuestoEgresoGeneral(datos: any[]) {

		let arrayData: any[] = [];
		let importe: number = 0;

		datos.forEach((element, index) => {
			element = [
				arrayData['num'] = index + 1,
				arrayData['anio'] = element['anio'],
				arrayData['codigo_centro'] = element['codigo_centro'],
				arrayData['nombre_centro'] = element['nombre_centro'],
				arrayData['codigo_proyecto'] = element['codigo_proyecto'],
				arrayData['nombre_proyecto'] = element['nombre_proyecto'],
				arrayData['fecha_inicio_proyecto'] = element['fecha_inicio_proyecto'],
				arrayData['fecha_final_proyecto'] = element['fecha_final_proyecto'],
				arrayData['codigo_subprograma'] = element['codigo_subprograma'],
				arrayData['nombre_subprograma'] = element['nombre_subprograma'],
				arrayData['codigo_fase'] = element['codigo_fase'],
				arrayData['nombre_fase'] = element['nombre_fase'],
				arrayData['descripcion_fase'] = element['descripcion_fase'],
				arrayData['codigo_tipo_financ'] = element['codigo_tipo_financ'],
				arrayData['nombre_tipo_financ'] = element['nombre_tipo_financ'],
				arrayData['estado'] = element['estado'],
				arrayData['municipio'] = element['municipio'],
				arrayData['codigo_postal'] = element['codigo_postal'],
				arrayData['asentamiento'] = element['asentamiento'],
				arrayData['tipo_asentamiento'] = element['tipo_asentamiento'],
				arrayData['domicilio'] = element['domicilio'],
				arrayData['codigo_partida'] = element['codigo_partida'],
				arrayData['nombre_partida'] = element['nombre_partida'],
				arrayData['importe'] = element['importe'],
			];

			importe += Number(element['importe']);

			arrayData.push(Object.values(element));
		});
		console.log([arrayData, importe]);
        
		return arrayData;
	}

	private footerTablePresupuestoEgresoGeneral(datos: any, colSpan: number) {
		let importe = datos.reduce((contador, egreso) => contador + parseInt(egreso.importe), 0);

		return [
			[
				{ content: 'Importe total', colSpan: colSpan, styles: { halign: 'right' } },
				{ content: importe, styles: { halign: 'right' } }
			]
		];
	}

}

