import { Component, ViewChild } from '@angular/core';
import { CogComponent } from '../cog/cog/cog.component';

@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {

	@ViewChild(CogComponent) cog_component: CogComponent;

	partidas: any;
	cog_data: any;
	cantidad: any;
	keys = [0, 0, 0];

	constructor() {
		this.cantidad = 0;
		this.partidas = [
			{
				id: 1,
				codigo: 113,
				nombre: 'Partida de prueba',
				importe: 53000
			}
		];
		this.cog_data = {
			id_capitulo: '',
			id_concepto: '',
			id_partida: '',
			codigo: '',
			nombre: ''
		};
	}

	onData(data: any) {
		this.cog_data = data;
		console.log('Desde el padre ', data);
	}

	agregarPartida() {
		this.partidas.push({
			id: this.cog_data.id_partida,
			codigo: this.cog_data.codigo,
			nombre: this.cog_data.nombre,
			importe: this.cantidad
		});
		this.cantidad = 0;
		this.cog_data = {
			id_capitulo: '',
			id_concepto: '',
			id_partida: ''
		};
		this.cog_component.onChangeCapitulo('');
	}

	eliminar(id) {
		console.log('Eliminado: ', id);
	}

}
