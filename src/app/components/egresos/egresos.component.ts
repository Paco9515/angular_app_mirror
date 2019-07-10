import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})
export class EgresosComponent implements OnInit {

	subprogramas: Subprograma[];
	detalle: Subprograma;

	constructor(
		private subprograma_service: SubprogramaService
	) {
		this.detalle = {
			id: '',
			id_programa: '',
			nombre_programa: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.subprogramas = [];
		this.getSubprogramas();
	}

	getSubprogramas() {
		this.subprograma_service.getSubprogramas()
			.subscribe((data: any) => {
				// console.log(data);
				this.subprogramas = data;
			});
	}

	eliminarActivar(id: string, type: boolean) {
		this.subprograma_service.activarEliminarSubprograma(id, type)
			.subscribe((response: any) => {
				console.log(response.message);
				this.getSubprogramas();
			}, error => {
				console.log('ERROR: ', error);
			});
	}

}
