import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeService } from '../../../../common/services/pe/pe.service';
import { ProyectoService } from '../../../../common/services/proyecto/proyecto.service';

@Component({
	selector: 'app-cambioEgreso',
	templateUrl: './cambioEgreso.component.html',
	styles: []
})
export class CambioEgresoComponent implements OnInit {

	array: any;

	constructor(
		private pe_service: PeService,
		private proyecto_service: ProyectoService
	) {
		this.array = [{
			id: 1,
			nombre: 'Proyecto 1',
			fases: [
				{
					id: 1,
					nombre: 'Fase 1',
					partidas: [{
							id: 1,
							nombre: 'Partida 1',
							importe: '3500'
						}, {
							id: 2,
							nombre: 'Partida 2',
							importe: '3500'
						}, {
							id: 3,
							nombre: 'Partida 3',
							importe: '3500'
						}
					]
				}, {
					id: 2,
					nombre: 'Fase 2',
					partidas: [{
						id: 1,
						nombre: 'Partida 1',
						importe: '3500'
					}, {
						id: 2,
						nombre: 'Partida 2',
						importe: '3500'
					}, {
						id: 3,
						nombre: 'Partida 3',
						importe: '3500'
					}
				]
				}, {
					id: 13,
					nombre: 'Fase 3',
					partidas: [{
						id: 1,
						nombre: 'Partida 1',
						importe: '3500'
					}, {
						id: 2,
						nombre: 'Partida 2',
						importe: '3500'
					}, {
						id: 3,
						nombre: 'Partida 3',
						importe: '3500'
					}
				]
				}
			]

		}
		];
	}

	ngOnInit() {
		this.array;
		// this.proyecto_service.getFasesProyecto(1)
		// 		.subscribe(( data: any) => {
		// 			console.log(data);
		// 			this.array = data.data;
		// 			console.log(this.array);
		// 			// this.mensaje.success(data);
		// 		}, error => {
		// 			// this.mensaje.danger(error.error);
		// 		});
	}

	guardarInfo() {
		// console.log(this.array);
	}

}
