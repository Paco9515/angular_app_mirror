import { Component, OnInit } from '@angular/core';
import { CcostoService } from "src/app/services/ui/ccosto.service";
import { Ccosto } from "src/app/interfaces/ui/ccosto";

@Component({
  selector: 'app-ccostos',
  templateUrl: './ccostos.component.html',
  styles: []
})
export class CcostosComponent  {

  ccostos: Ccosto[];

  constructor(
		private ccosto_service: CcostoService
	) {
		this.ccostos = [];
		this.getCcostos();
	}

  getCcostos() {
		this.ccosto_service.getCcostos()
			.subscribe((data: any) => {
				this.ccostos = data;
				console.log('Constructor: ', this.ccostos);
			});
	}

}