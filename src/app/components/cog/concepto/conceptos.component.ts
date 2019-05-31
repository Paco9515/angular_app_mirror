import { Component } from '@angular/core';
import { Conceptos } from './../../../interfaces/cog/conceptos';
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

}
