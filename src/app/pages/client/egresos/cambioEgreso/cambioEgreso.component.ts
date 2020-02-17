import { Component, OnInit } from '@angular/core';
import { PresupuestoEgresoService } from '../../../../common/services/presupuesto/egreso.service';
import { Router } from '@angular/router';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { distinct } from 'rxjs/operators';
// import { ActivatedRoute } from '@angular/router';
// import { NgForm } from '@angular/forms';


@Component({
	selector: 'app-cambioEgreso',
	templateUrl: './cambioEgreso.component.html',
	styles: []
})
export class CambioEgresoComponent {

	proyectos: any;
	proyectos2: any[];
	anioPresEgreso: number;
	totalProyecto: number;
	totalProyecto2: number;
	diff: number;
	anioEgreso: number;
	bandera: number;
	bandImporte: boolean;
	cuentaTabla: boolean;
	array2: any[];
	aumentTranf: boolean;
	id_pres: number;
	envioInfo: any;
	partidasCambiadas: any;

	x: boolean;

	constructor(
		private presupuestoEgresos: PresupuestoEgresoService,
		private router: Router,
		private mensaje: MensajesService
	) {
		this.totalProyecto = 0;
		this.totalProyecto2 = 0;
		this.diff = 0;
		this.bandera = 0;
		this.bandImporte = false;
		this.cuentaTabla = true;
		this.proyectos = [];
		this.proyectos2 = [];
		this.array2 = [];

		this.inicio();
	}

	private inicio() {
		this.id_pres = null;
		this.totalProyecto = 0;
		this.totalProyecto2 = 0;
		this.diff = 0;
		this.bandera = 0;
		this.proyectos = [];
		this.proyectos2 = [];
		this.partidasCambiadas = [];
		this.envioInfo = {
			partidasOriginal: null,
			partidas: null,
			partidasCambiadas: null
		};
		this.presupuestoEgresos.get_presupuestoActual('3')
		.subscribe((data1: any) => {
			this.proyectos2 = data1.data;
			this.id_pres = data1.data[0].id_pres;
		});

		this.presupuestoEgresos.get_presupuestoActual('3')
		.subscribe((data2: any) => {
			this.proyectos = data2.data;
			this.totalProyecto = 0;
			for (const proyecto of this.proyectos) {
				this.totalProyecto += proyecto.importe;
				this.totalProyecto2 += proyecto.importe;
			}

			this.anioEgreso = this.proyectos[1].anio;
		});
	}

	private aumento() {
		this.aumentTranf = true;
		// this.desbloquearBandera();
		this.cuentaTabla = false;
		document.getElementById('tabla1').removeAttribute('style');
	}

	private transferir() {
		this.aumentTranf = false;
		this.cuentaTabla = false;
		document.getElementById('tabla1').removeAttribute('style');
	}

	private calcularTotalTransf(a?: any, partida?: any) {
		// ** Funcion para agregar las partidas que se van a modificar a array  ** //
		const id_fase_partida = partida.id_fase_partida;
		this.partidasCambiadas.push(id_fase_partida);
		// ** Funcion para filtar partidas que si tuvieron cambios ** //
		if (this.proyectos2[a].importe === partida.importe) {
			this.partidasCambiadas = this.partidasCambiadas.filter( function (value, index, arr) {
				return value !== partida.id_fase_partida;
			});
			console.log('segundo array', this.partidasCambiadas);
		}
		
		this.bloquearBandera(a);
		this.totalProyecto = 0;
		this.diff = 0;
		for (const proyecto of this.proyectos) {
			this.totalProyecto += proyecto.importe;
		}
		this.diff = this.totalProyecto2 - this.totalProyecto;

		if (this.totalProyecto2 < this.totalProyecto) {
			this.bandera = 2;
		}
		if (this.totalProyecto2 > this.totalProyecto) {
			this.bandera = 1;
		}
		if (this.totalProyecto2 === this.totalProyecto) {
			this.bandera = 0;
			if (this.aumentTranf === false) {
				document.getElementById('guardar1').removeAttribute('disabled');
			}
			this.desbloquearBandera();
			// this.guardar();
		}
	}


	private calcularTotalAumento(a?: any, partida?: any) {
		// ** Funcion para agregar las partidas que se van a modificar a array  ** //
		const id_fase_partida = partida.id_fase_partida;
		this.partidasCambiadas.push(id_fase_partida);
		// ** Funcion para filtar partidas que si tuvieron cambios ** //
		if (this.proyectos2[a].importe === partida.importe) {
			this.partidasCambiadas = this.partidasCambiadas.filter( function (value, index, arr) {
				return value !== partida.id_fase_partida;
			});
			console.log('segundo array', this.partidasCambiadas);
		}


		this.totalProyecto = 0;
		this.diff = 0;
		for (const proyecto of this.proyectos) {
			this.totalProyecto += proyecto.importe;
		}
		this.diff = this.totalProyecto2 - this.totalProyecto;

		if (this.totalProyecto2 < this.totalProyecto) {
			this.bandera = 2;
		}
		if (this.totalProyecto2 > this.totalProyecto) {
			this.bandera = 1;
		}
		if (this.totalProyecto2 === this.totalProyecto) {
			this.bandera = 0;
		}

	}

	private bloquearBandera(a?: any) {
		document.getElementById('item' + a).setAttribute('disabled', 'true');
	}

	private desbloquearBandera() {
		let a = 0;
		for (const proyecto of this.proyectos) {
			document.getElementById('item' + a).removeAttribute('disabled');
			a++;
		}
		this.cuentaTabla = false;
		document.getElementById('tabla1').removeAttribute('style');
	}

	private limpiarCampos() {
		this.array2 = [];
		this.presupuestoEgresos.get_presupuestoActual('3')
		.subscribe((data2: any) => {
			this.array2 = data2.data;
			this.proyectos = this.array2;
		});
		if (this.aumentTranf === false) {
			document.getElementById('guardar1').setAttribute('disabled', 'true');
		}
		this.totalProyecto = 0;
		this.diff = 0;
		this.totalProyecto = this.totalProyecto2;
		this.bandera = 0;
	}

	private guardar() {
		// document.getElementById('guardar').removeAttribute('disabled');
		this.envioInfo.partidasOriginal = this.proyectos2;
		this.envioInfo.partidas = this.proyectos;
		this.envioInfo.partidasCambiadas = this.partidasCambiadas;
		this.x = true;
		console.log(this.envioInfo);

		this.presupuestoEgresos.modificar_egreso(this.envioInfo).subscribe(( data: any ) => {
				// console.log('data', data);
				return this.mensaje.success(data);
			}, error => {
				// console.log(error);
				return this.mensaje.danger(error.error);
		});
		this.inicio();
	}

	private cancelar() {
		this.limpiarCampos();
		this.cuentaTabla = true;
		document.getElementById('tabla1').setAttribute('style', 'display: none');
		this.inicio();
	}

	// Redireccion a proyectos
	mostrarProyectos() {
		const bandera = true;
		this.router.navigate([`/panel-adm/mod_proyectos/${this.id_pres}/proyectos/${bandera}`]);
	}


}
