import { Component } from '@angular/core';
import { ClasAdministrativaService } from './../../../services/ca/clas-administrativa.service';
import { Clas_administrativa } from './../../../interfaces/ca/clas_administrativa';

@Component({
  selector: 'app-clas-administrativas',
  templateUrl: './clas-administrativas.component.html',
  styles: []
})
export class ClasAdministrativasComponent{

	admins: Clas_administrativa[];

	constructor(
		private administrativa_service: ClasAdministrativaService
	) {
		this.admins = [];
		this.getAdministrativas();
	 }

	getAdministrativas() {
		this.administrativa_service.getAdministrativas()
			.subscribe((data: any) => {
				this.admins = data;
			});
	}
}
