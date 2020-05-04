import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
	providedIn: 'root'
})
export class PDFService  {
    private doc: jsPDF;

    constructor() {}

    public buildPDF(orientation: string = 'p', format: string = 'letter') {
        this.doc = new jsPDF({
			orientation: orientation,
			unit: 'mm',
			format: format,
        });
    }

    public createTable(headTable: any[], bodyTable: any[], footTable: any[]) {
		this.doc.autoTable({
			theme: 'grid',
			styles: {
				font: 'helvetica',
				fontSize: 8,
			},
			showFoot: 'lastPage',
			startY: 50,
			startX: 10,
			tableWidth: 'auto',
			headStyles: {
				halign: 'center',
				lineWidth: 0.2,
			},
			bodyStyles: {
				lineWidth:0.2
			},
			rowPageBreak: 'avoid',
            head: headTable,
			body: bodyTable,
			foot: footTable,
			margin: { top: 50 }
		});
		return this.doc;
	}

    public headerFooterPage(datos:any) : jsPDF {
        let srcImagen = 'assets/img/sin_img.jpg';
        let xAxisImagen = 150;
        let yAxisImagen = 5;
        let widthImagen = 40;
        let heightImagen = 40;
        let xAxisText = 210;
        let empresa = datos.nombre_comercial;
        let datosEmpresa = 'RFC: ' + datos.rfc + ' IMSS: ' + datos.imss_sar + ' Reg. Estatal: ' + datos.reg_estatal;
        let direccion = 'Calle: ' + datos.calle + ', Colonia: ' +  datos.nombre_asentamiento + datos.num_exterior + ' C.P. ' + datos.codigo_postal;
        let direccion2 = 'Municipio: ' + datos.nombre_municipio + '  Estado: ' + datos.nombre_estado;

		var pageHeight = this.doc.internal.pageSize.height || this.doc.internal.pageSize.getHeight();
        var pageWidth = this.doc.internal.pageSize.width || this.doc.internal.pageSize.getWidth();
        var totalPages = this.doc.internal.getNumberOfPages();

        var img = new Image();
        img.src = srcImagen;
		// For each page, print the page number and the total pages
        for (var i = 1; i <= totalPages; i++) {
            this.doc.setFontSize(14);
            this.doc.text(String(empresa), xAxisText, 15);
            this.doc.setFontSize(12);
            this.doc.text(String(datosEmpresa), xAxisText, 22);
            this.doc.text(String(direccion), xAxisText, 29);
            this.doc.text(String(direccion2), xAxisText, 36);
            this.doc.addImage(img, 'JPG', xAxisImagen, yAxisImagen, widthImagen, heightImagen);
			// Go to page i
            this.doc.setPage(i);
			//Print Page 1 of 4 for example
			this.doc.text('Pagina ' + String(i) + ' / ' + String(totalPages), pageWidth / 2, pageHeight  - 10, 'center');
		}
		return this.doc;
    }
    
    public dowloadPDF(name: string) {
        return this.doc.save(name + '.pdf');
    }

    public seePDF() {
        return this.doc.output('dataurlnewwindow');
    }

    public createText(text: string, xAxisText: number, yAxisText: number) {
        return this.doc.text(text, xAxisText, yAxisText)
    }

    public addPage() {
        return this.doc.addPage();
    }

    public addImagen(srcImagen: string, typeImagen: string,xAxis: number, yAxis: number, widthImagen: number, heightImagen: number ) {
        var img = new Image();
        img.src = srcImagen;
        this.doc.addImage(img, typeImagen, xAxis, yAxis, widthImagen, heightImagen);
    }
}
