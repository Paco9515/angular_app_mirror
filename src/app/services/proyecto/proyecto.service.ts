import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Proyecto } from 'src/app/interfaces/proyectos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
	}

  	getProyectos() {
		// return this.constants.getRequest(`/get_empresa/${id}`, 'get', null);
		const proyectos = [[1, 'Proyecto 1', 100000], [2, 'Proyecto 2', 50000], [3, 'Proyecto 3', 9000]];
		return proyectos;
  	}

	getPartidas_Proyecto(id) {
 
		let partidas = [];

		 // return this.constants.getRequest(`/get_soloempresas`, 'get', null);
		if (id === 1) {
			partidas = [
				{	id: 1,
					nombre: 'Partida 1'	,
					saldo: 50000
				},
				{	id: 2,
					nombre: 'Partida 2'	,
					saldo: 50000
				}
			];
		}

		// tslint:disable-next-line: align
  		if (id === 2) {
			partidas = [
				{	id: 1,
					nombre: 'Partida 1'	,
					saldo: 10000
				},
				{	id: 2,
					nombre: 'Partida 2'	,
					saldo: 10000
				},
				{	id: 3,
					nombre: 'Partida 3'	,
					saldo: 10000
				},
				{	id: 4,
					nombre: 'Partida 4'	,
					saldo: 10000
				},
				{	id: 5,
					nombre: 'Partida 5'	,
					saldo: 10000
				}
			];
		}

  		// tslint:disable-next-line: align
  		if (id === 3) {
			partidas = [
				{	id: 1,
					nombre: 'Partida 1'	,
					saldo: 3000
				},
				{	id: 2,
					nombre: 'Partida 2'	,
					saldo: 3000
				},
				{	id: 3,
					nombre: 'Partida 3'	,
					saldo: 3000
				}
			];
		}

		return partidas;
	}

	// tslint:disable-next-line: align
	get_partidas(id_proyecto: any, id_partida1: any, id_partida2: any) {
		const partidas = [];
		if (id_proyecto === 1) {
			if (id_partida1 === 1) {
				partidas.push([1, 'Partida 1', 50000]);
			}
			if (id_partida1 === 2) {
				partidas.push([2, 'Partida 2', 50000]);
			}
			if (id_partida2 === 1) {
				partidas.push([1, 'Partida 1', 50000]);
			}
			if (id_partida2 === 2) {
				partidas.push([2, 'Partida 2', 50000]);
			}
		}


		return partidas;
	}


}
