import { Component } from '@angular/core';
import { Conceptos } from './../../../interfaces/cog.interface';
import { ConceptoService } from './../../../services/cog/concepto.service';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styles: []
})
export class ConceptosComponent {

    conceptos: Conceptos[];

    constructor(
        private concepto_service: ConceptoService
    ) {
        this.conceptos = [];
        this.getConceptos();
    }
    
    getConceptos(){
        this.concepto_service.getConceptos()
            .subscribe((data: any) => {
                this.conceptos = data;
            });
    }

    eliminar(id: string) {
		this.concepto_service.eliminarConcepto(id)
			.subscribe((response: any) => {
				this.getConceptos();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Eliminado con exito.');
	}

	activar(concepto: Conceptos) {
		this.concepto_service.activarConcepto({
			id: concepto.id,
			nombre: concepto.nombre,
			status: !concepto.status
		}).subscribe((data: any) => {
				this.getConceptos();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Activado con exito.');
	}


}
