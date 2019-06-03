import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../../interfaces/cff/tipo';
import { TipoService } from '../../../services/cff/tipo.service';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styles: []
})
export class TiposComponent  {

  tipos: Tipo[];

  constructor(
		private tipos_service: TipoService
	) {
		this.tipos = [];
		this.getTipos();
	}

  getTipos() {
		this.tipos_service.getTipos()
			.subscribe((data: any) => {
				this.tipos = data;
				console.log('Constructor: ', this.tipos);
			});
	}

}
