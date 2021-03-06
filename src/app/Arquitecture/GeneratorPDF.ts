import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
	providedIn: 'root'
})

export class GeneratorPDF {

	private doc: jsPDF;
	private fontSize: number;

	constructor() {}

	public buildPDF(orientation: string = 'p', format: string = 'letter', fontSize: number = 12): jsPDF {
		this.doc = new jsPDF({
			orientation,
			unit: 'mm',
			format,
		});
		this.fontSize = fontSize;
		return this.doc.setFontSize(this.fontSize);
	}

	public createTable(headTable: any[] = [], bodyTable: any[], footTable: any[] = [], fontSize: number = 10): jsPDF {
		this.doc.autoTable({
			theme: 'grid',
			styles: {
				font: 'helvetica',
				fontSize,
			},
			showFoot: 'lastPage',

			tableWidth: 'auto',
			headStyles: {
				halign: 'center',
				lineWidth: 0.2,
			},
			bodyStyles: {
				lineWidth: 0.2
			},
			rowPageBreak: 'avoid',
			head: headTable,
			body: bodyTable,
			foot: footTable,
			margin: { top: 45, left: 15, right: 15 }
		});
		return this.doc;
	}

	public headerFooterPage(datos: any,  xAxisText = 75,  xAxisImagen: number = 25): jsPDF {
		const yAxisImagen = 5;
		const empresa = datos.nombre_comercial;
		let datosEmpresa = `RFC: ${ datos.rfc }`;

		if (datos.imss_sar) {
			datosEmpresa += ` IMSS: ${ datos.imss_sar }`;
		}

		if (datos.reg_estatal) {
			datosEmpresa += ` Reg. Estatal: ${ datos.reg_estatal }`;
		}

		// tslint:disable-next-line: max-line-length
		const direccion = `Calle: ${ datos.calle }, \nColonia: ${ datos.nombre_asentamiento } ${ datos.num_exterior } C.P. ${ datos.codigo_postal } \nMunicipio: ${ datos.nombre_municipio }  Estado: ${ datos.nombre_estado}`;
		const pageHeight = this.doc.internal.pageSize.height || this.doc.internal.pageSize.getHeight();
		const pageWidth = this.doc.internal.pageSize.width || this.doc.internal.pageSize.getWidth();
		const totalPages = this.doc.internal.getNumberOfPages();

		const img = new Image();
		// img.src = String(`assets/images/${ datos.url_img }`);

		// For each page, print the footer and header in all page
		for (let i = 1; i <= totalPages; i++) {
			this.doc.text(String(empresa), xAxisText, 15);
			this.doc.setFontSize(this.fontSize - 2);
			this.doc.text(String(datosEmpresa), xAxisText, 20);
			this.doc.text(String(direccion), xAxisText, 24);
			// this.doc.addImage(img, 'PNG', xAxisImagen, yAxisImagen, 35, 35);
			// Go to page i
			this.doc.setPage(i);
			// Print Page 1 of 4 for example
			this.doc.text(`Página ${ String(i) } / ${ String(totalPages) }`, pageWidth / 2, pageHeight  - 10, 'center');
		}

		return this.doc;
	}

	public dowloadPDF(name: string): jsPDF {
		return this.doc.save(name + '.pdf');
	}

	public showPdf(): jsPDF {
		return this.doc.output('dataurlnewwindow');
		// return this.doc.output();
	}

	public createText(text: string, xAxisText: number, yAxisText: number): jsPDF {
		return this.doc.text(text, xAxisText, yAxisText);
	}

	public addPage(): jsPDF {
		return this.doc.addPage();
	}

	public addImagen(srcImagen: string, typeImagen: string, xAxis: number, yAxis: number, widthImagen: number, heightImagen: number ): jsPDF {
		const img = new Image();
		img.src = srcImagen;
		return this.doc.addImage(img, typeImagen, xAxis, yAxis, widthImagen, heightImagen);
	}
}
