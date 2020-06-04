import { Injectable } from '@angular/core';
import { GeneratorPDF } from '../GeneratorPDF';
import * as jsPDF from 'jspdf';

@Injectable({
	providedIn: 'root'
})

export class JspdfPresupuestoEgresoGeneral extends GeneratorPDF {

	public pdf: jsPDF;
	private egreso: any;
	private importe = 0;

	constructor(empresa, relacionPresupuestEgreso: any [], egreso) {
		super();
		this.egreso = egreso;

		const headTable = this.headTable(egreso);
		const bodyTable = this.bodyTable(relacionPresupuestEgreso);
		const footTable = this.tableFooterCounter(relacionPresupuestEgreso, 23);


		this.pdf = this.buildPDF('l', 'tabloid');
		this.pdf = this.createTable(headTable, bodyTable, footTable, 6);
		// ESTA FUNCION SE LLAMA AL FINAL PARA QUE COLOQUE EL HEADER Y EL FOOTER EN TODAS LAS PAGINAS QUE SE REALICEN
		this.pdf = this.headerFooterPage(empresa);

	}

	public dowload() {
		const fecha = new Date();
		const nombre = `${this.egreso.nombre } ${ this.egreso.nombre_centro_costo}`;
		const fechaActual = `${ String(fecha.getDay()).padStart(2, '0') }${ String(fecha.getMonth()).padStart(2, '0') }${ fecha.getFullYear() }`;
		// tslint:disable-next-line: max-line-length
		const hora = `${ String(fecha.getHours()).padStart(2, '0') } ${ String(fecha.getMinutes()).padStart(2, '0') } ${ String(fecha.getSeconds()).padStart(2, '0') }`;
		return this.dowloadPDF(nombre + fechaActual + hora);
	}

	public show() {
		return this.showPdf();
	}

	private headTable(egreso: any) {
		return [
			[
				{ title: `${ egreso.nombre } \n(${ egreso.nombre_centro_costo })` , colSpan: 24 }
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

	private bodyTable(datos: any) {

		const arrayData: any[] = [];

		datos.forEach((dato, index) => {

			this.importe  = this.importe + parseFloat(dato.importe);

			arrayData.push([
				{ content: index + 1, styles: { halign: 'center' }  },
				{ content: dato.anio },
				{ content: dato.codigo_centro, styles: { halign: 'center', cellWidth: 'wrap' } },
				{ content: dato.nombre_centro },
				{ content: dato.codigo_proyecto, styles: { halign: 'center', cellWidth: 'wrap' } },
				{ content: dato.nombre_proyecto },
				{ content: dato.fecha_inicio_proyecto },
				{ content: dato.fecha_final_proyecto },
				{ content: dato.codigo_subprograma, styles: { halign: 'center', cellWidth: 'wrap' } },
				{ content: dato.nombre_subprograma },
				{ content: dato.codigo_fase, styles: { halign: 'center', cellWidth: 'wrap' } },
				{ content: dato.nombre_fase },
				{ content: dato.descripcion_fase },
				{ content: dato.codigo_tipo_financ, styles: { halign: 'center', cellWidth: 'wrap' } },
				{ content: dato.nombre_tipo_financ },
				{ content: dato.estado },
				{ content: dato.municipio },
				{ content: dato.codigo_postal, styles: { halign: 'center', cellWidth: 'wrap' } },
				{ content: dato.asentamiento },
				{ content: dato.tipo_asentamiento },
				{ content: dato.domicilio },
				{ content: dato.codigo_partida, styles: { halign: 'center', cellWidth: 'wrap' } },
				{ content: dato.nombre_partida },
				{ content: '$ ' + dato.importe, styles: { halign: 'right', cellWidth: 'wrap'  } }
			]);

		});

		return arrayData;
	}

	private tableFooterCounter(datos: any, colSpan: number) {

		return [
			[
				{ content: 'Importe total', colSpan, styles: { halign: 'right' } },
				{ content: '$ ' + this.importe.toFixed(2),  styles: {  halign : 'right', cellWidth: 'wrap' }}
			]
		];
	}

}
