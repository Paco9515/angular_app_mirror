import { Component, OnInit } from '@angular/core';
import { CtrabajoService } from "src/app/services/ui/ctrabajo.service";
import { Ctrabajo } from "src/app/interfaces/ui.interface";

@Component({
  selector: 'app-ctrabajos',
  templateUrl: './ctrabajos.component.html',
  styles: []
})
export class CtrabajosComponent  {

  ctrabajos: Ctrabajo[];

  constructor(
		private ctrabajo_service: CtrabajoService
	) {
		this.ctrabajos = [];
		this.getCcostos();
	}

  getCcostos() {
		this.ctrabajo_service.getCtrabajos()
			.subscribe((data: any) => {
				this.ctrabajos = data;
				console.log('Constructor: ', this.ctrabajos);
			});
	}

}