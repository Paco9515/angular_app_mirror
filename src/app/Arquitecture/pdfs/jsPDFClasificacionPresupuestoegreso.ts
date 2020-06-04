import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { GeneratorPDF } from '../GeneratorPDF';

@Injectable({
	providedIn: 'root'
})

export class JspdfClasificacionPresupuestoEgreso extends GeneratorPDF {

	public importe = 0;

	public pdf: jsPDF;
	private egreso: any;

	constructor(empresa, datosClasificaciones: any [], egreso, tipoClasificacion) {
		super();
		this.egreso = egreso;

		const headTable = [
			[
				{ title: tipoClasificacion, colSpan: 4 }
			],
			[
				{ title: 'Nº' },
				{ title: 'Código' },
				{ title: 'Nombre' },
				{ title: 'Importe' }
			]
		];

		const bodyTable = this.bodyTable(datosClasificaciones);
		const footTable = this.tableFooterCounter(datosClasificaciones, 3);

		// this.pdf = new PDFService();
		this.pdf = this.buildPDF('p', 'letter');
		this.pdf = this.createTable(headTable, bodyTable, footTable);
		this.pdf = this.headerFooterPage(empresa);

	}

	public dowload(tipoClasificacion: string  = 'Clasificacion') {
		const fecha = new Date();
		const nombre = `${tipoClasificacion}${this.egreso.nombre }`;
		const fechaActual = `${ String(fecha.getDay()).padStart(2, '0') }${ String(fecha.getMonth()).padStart(2, '0') }${ fecha.getFullYear() }`;
		// tslint:disable-next-line: max-line-length
		const hora = `${ String(fecha.getHours()).padStart(2, '0') } ${ String(fecha.getMinutes()).padStart(2, '0') } ${ String(fecha.getSeconds()).padStart(2, '0') }`;
		return this.dowloadPDF(nombre + fechaActual + hora);

	}

	public show() {
		return this.showPdf();

	}

	private bodyTable(datos: any[]) {

		const arrayData: any[] = [];

		datos.forEach((dato, index) => {
			this.importe  = this.importe + parseFloat(dato.importe);

			arrayData.push([
				{ content: index + 1, styles: {  halign : 'center', cellWidth: 'wrap'   } },
				{ content: dato.codigo, styles: {  halign : 'center', cellWidth: 'wrap'   } },
				{ content: dato.nombre },
				{ content: '$ ' + dato.importe, styles: {  halign : 'right', cellWidth: 'wrap'   } }
			]);
		});
		return arrayData;
	}

	private tableFooterCounter(datos: any, colSpan: number) {

		return [
			[
				{ content: 'Importe total', colSpan, styles: { halign: 'right' } },
				{ content: '$ ' + this.importe.toFixed(2),  styles: {  halign : 'right', cellWidth: 'wrap'  }}
			]
		];
	}
}