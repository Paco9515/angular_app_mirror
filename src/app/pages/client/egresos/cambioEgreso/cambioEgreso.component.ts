import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeService } from '../../../../common/services/pe/pe.service';


@Component({
	selector: 'app-cambioEgreso',
	templateUrl: './cambioEgreso.component.html',
	styles: []
})
export class CambioEgresoComponent implements OnInit {

	array: any;

	constructor(
		private pe_service: PeService
	) {
		this.array = [];
	}

	ngOnInit() {
		this.pe_service.get_pe('1')
				.subscribe(( data: any) => {
					console.log(data);
					this.array = data.data;
					console.log(this.array);
					// this.mensaje.success(data);
				}, error => {
					// this.mensaje.danger(error.error);
				});
	}

	guardarInfo() {
		// console.log(this.array);
	}

}
