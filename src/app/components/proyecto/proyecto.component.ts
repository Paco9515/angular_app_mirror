import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';

@Component({
	selector: 'app-proyecto',
	templateUrl: './proyecto.component.html',
	styles: []
})
export class ProyectoComponent implements OnInit {
	id_proyecto;
	proyectos = [];
	partidasOld = [];
	partidas = [];
	partidasOriginal = [];
	array = [];
	total_proyecto: number = null;
	nuevoTotal_proyecto: number = null;
	banderaDiferencia = 1;
	bandera = [];
	banderaTotal = false;
	banderaButton = false;
	banderaDisabled1 = [];
	banderaDisabled2 = [];
	banderaMensaje1 = [];
	banderaMensaje2 = [];
	saldo_inicial = [];
	diferencia = 0;


	constructor(
		private proyecto_service: ProyectoService
	) {
	}

	ngOnInit() {
		this.iniciar();
	}

	iniciar() {
		this.nuevoTotal_proyecto = this.total_proyecto;
		this.proyectos = this.proyecto_service.getProyectos();
		// console.log('Proyectos', this.proyectos);
	}

	getPartidas(id: any) {
		this.banderaTotal = false;
		if (this.total_proyecto === this.nuevoTotal_proyecto) {
			this.banderaButton = true;
		}
		this.diferencia = 0;
		this.total_proyecto = 0;
		this.id_proyecto = '';
		this.partidas = this.proyecto_service.getPartidas_Proyecto(id);
		this.partidasOld = this.proyecto_service.getPartidas_Proyecto(id);
		this.partidasOriginal = this.proyecto_service.getPartidas_Proyecto(id);
		let i = 0;
		for ( const partida of this.partidas) {
			this.total_proyecto = this.total_proyecto + partida.saldo;
			this.saldo_inicial[i] = partida.saldo;
			this.bandera[i] = 1;
			this.banderaDisabled1[i] = false;
			this.banderaDisabled2[i] = false;
			this.banderaMensaje1[i] = false;
			this.banderaMensaje2[i] = false;
			i = i + 1;
		}
		this.nuevoTotal_proyecto = this.total_proyecto;

	}

	mensaje(saldo: any, i: number) {
		// console.log(saldo);
		if (this.saldo_inicial[i] === saldo) {
			this.bandera[i] = 1;
		} else {
			if (this.saldo_inicial[i] > saldo) {
				this.bandera[i] = 3;
			} else {
				if (this.saldo_inicial[i] < saldo) {
					this.bandera[i] = 2;
				}
			}
		}
		this.nuevoTotal_proyecto = 0;
		for ( const partida of this.partidas) {
			this.nuevoTotal_proyecto = this.nuevoTotal_proyecto + partida.saldo;
		}
		// console.log(this.nuevoTotal_proyecto);
		if (this.total_proyecto === this.nuevoTotal_proyecto) {
			this.banderaButton = true;
		} else {
			this.banderaButton = false;
		}
	}

	enviar() {
		console.log(this.partidas);
	}

	transferir(id: any) {

		this.nuevoTotal_proyecto = 0;
		for (const partida of this.partidas) {
			this.nuevoTotal_proyecto = this.nuevoTotal_proyecto + partida.saldo;
		}

		this.diferencia = this.total_proyecto - this.nuevoTotal_proyecto;

		// console.log(this.diferencia);


		if (this.diferencia === 0) {
			this.banderaDiferencia = 1;
		} else {
			if (this.diferencia > 0) {
				this.banderaDiferencia = 2;
			} else {
				if (this.diferencia < 0) {
					this.banderaDiferencia = 3;
				}
			}
		}

		if (this.diferencia !== 0) {
			this.banderaButton = false;
			this.banderaTotal = true;
		} else {
			this.banderaButton = true;
			this.banderaTotal = false;
		}
		// console.log(this.banderaButton);

	}

	disabled1(id: any) {
		for (let x = 0; x < this.partidas.length; x ++) {
			this.banderaDisabled1[x] = false;
			this.banderaDisabled2[x] = false;
		}
		this.banderaDisabled2[id] = true;

		if (this.partidasOld[id].saldo > this.partidas[id].saldo) {
			this.banderaMensaje1[id] = true;
			for (let x = 0; x < this.partidas.length; x ++) {
				this.banderaDisabled1[x] = true;
				this.banderaDisabled2[x] = true;
			}
			this.banderaDisabled1[id] = false;
		} else {
			this.banderaMensaje1[id] = false;
			this.transferir(id);
			this.partidasOld[id].saldo = this.partidas[id].saldo;
		}


	}

	disabled2(id: any) {
		for (let x = 0; x < this.partidas.length; x ++) {
			this.banderaDisabled1[x] = false;
			this.banderaDisabled2[x] = false;
		}
		this.banderaDisabled1[id] = true;

		if (this.partidasOld[id].saldo < this.partidas[id].saldo) {
			this.banderaMensaje2[id] = true;
			for (let x = 0; x < this.partidas.length; x ++) {
				this.banderaDisabled1[x] = true;
				this.banderaDisabled2[x] = true;
			}
			this.banderaDisabled2[id] = false;
		} else {
			this.banderaMensaje2[id] = false;
			this.transferir(id);
		}
	}



}
