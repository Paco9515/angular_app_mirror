import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';
import { CambioEgresoService } from 'src/app/common/services/presupuesto/cambioEgreso';
import { Movimiento } from 'src/app/common/interfaces/cambioEgreso';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PartidaService } from 'src/app/common/services/cog/partida.service';


@Component({
	selector: 'app-transferir',
	templateUrl: './transferir.component.html',
	styles: []
})
export class TransferirComponent {

	movimiento: Movimiento;
	id_cc: string;
	id_user: string;
	info_cc_origen: any;
	info_cc_destino: any;
	centro1: string;
	centros1: any;
	centro2: string;
	centros2: any;
	proyecto1: string;
	proyectos1: any; 
	proyecto2: string;
	proyectos2: any;
	fase1: string;
	fases1: any;
	fase2:any;
	fases2: any;
	partida1: string;
	partidas1: any;
	partida2: string;
	partidas2: any;
	saldo1: string;
	saldo2: string;
	importe: string;


	banderaProyecto1: boolean;
	banderaProyecto2: boolean;
	banderaFase1: boolean;
	banderaFase2: boolean;
	banderaPartida1: boolean;
	banderaPartida2: boolean;
	banderaImporte: boolean;
	banderaGuardar: boolean;
	banderaSaldo1: boolean;
	banderaSaldo2: boolean;

	constructor(
		private cambioEgresos: CambioEgresoService,
		private router: Router,
		private mensaje: MensajesService
	) {
		const user = JSON.parse(localStorage.getItem('currentUser'));
		this.id_cc = user.id_cc;
		this.id_user = user.id;		

		this.inicio();
	}

	private inicio() {

		this.centro1 = '';
		this.centro2 = '';
		this.proyecto1 = '';
		this.proyecto2 = '';
		this.banderaProyecto1 = true;
		this.banderaProyecto2 = true;
		this.fase1 ='';
		this.fase2 ='';
		this.banderaFase1 = true;
		this.banderaFase2 = true;
		this.partida1 = '';
		this.partida2 = '';
		this.banderaPartida1 = true;
		this.banderaPartida2 = true;
		this.saldo1 = '';
		this.saldo2 = '';
		this.importe = '';
		this.banderaImporte = true;
		this.banderaGuardar = true;
		this.banderaSaldo1 = false;
		this.banderaSaldo2 = false;		
		this.movimiento = {
			tipo_movimiento: '',
			id_cc_origen: '',
			cc_origen: '',
			id_partida_origen: '',
			id_cc_destino: '',
			cc_destino: '',
			id_partida_destino: '',
			importe: '',
			id_cc: ''			
		};

		this.cambioEgresos.get_arbol(this.id_cc).subscribe((cc: any) => {
			// console.log('inicio', cc);
			this.centros1 = cc;
			this.centros2 = cc;
		});
		
	}

	cargarProyectos1(id_cc: string) {
		if(id_cc === '') {
			this.banderaProyecto1 = true;	
			this.proyecto1 = '';	
			this.banderaFase1 = true;		
			this.fase1 = '';
			this.banderaPartida1 = true;
			this.partida1 = '';
			this.saldo1 = '';
			this.banderaSaldo1 = false;
			this.banderaImporte = true;			
			this.importe = '';
			this.banderaGuardar = true;
			return;
		}
		
		this.banderaProyecto1 = false;		
		this.banderaFase1 = true;		
		this.fase1 = '';
		this.banderaPartida1 = true;
		this.partida1 = '';
		this.saldo1 = '';
		this.banderaSaldo1 = false;
		this.banderaImporte = true;
		this.importe = '';
		this.banderaGuardar = true;

		this.cambioEgresos.get_cc(id_cc).subscribe((info_cc: any) => {
			console.log('info_cc', info_cc);
			this.info_cc_origen = info_cc;
		});

		this.cambioEgresos.get_proyectosActuales(id_cc).subscribe((proyectos: any) => {
			// console.log('proyectos', proyectos);
			this.proyectos1 = proyectos.data;
		}, error => {
			console.log(error);
			this.mensaje.danger(error);
		});
	}

	cargarFases1(id_proyecto: string) {
		if(id_proyecto == '') {
			this.banderaFase1 = true;		
			this.fase1 = '';
			this.banderaPartida1 = true;
			this.partida1 = '';
			this.saldo1 = '';
			this.banderaSaldo1 = false;
			this.banderaImporte = true;
			this.importe = '';
			this.banderaGuardar = true;
			return;
		}
		this.banderaFase1 = false;		
		this.banderaPartida1 = true;
		this.partida1 = '';
		this.saldo1 = '';
		this.banderaSaldo1 = false;
		this.banderaImporte = true;
		this.importe = '';
		this.banderaGuardar = true;

		this.cambioEgresos.get_fasesActuales(id_proyecto).subscribe((fases: any) => {
			// console.log('fases', fases);
			this.fases1 = fases.data;
		}, error => {
			this.mensaje.danger(error);
		});
	}

	cargarPartidas1(id_fase: string) {
		if(id_fase == '') {
			this.banderaPartida1 = true;
			this.partida1 = '';
			this.saldo1 = '';
			this.banderaSaldo1 = false;
			this.banderaImporte = true;
			this.importe = '';
			this.banderaGuardar = true;
			return;
		}
		this.banderaPartida1 = false;
		this.saldo1 = '';
		this.banderaSaldo1 = false;
		this.banderaImporte = true;		
		this.importe = '';
		this.banderaGuardar = true;

		this.cambioEgresos.get_partidasActuales(id_fase).subscribe((partidas: any) => {
			// console.log('partidas', partidas);
			this.partidas1 = partidas.data;
		}, error => {
			this.mensaje.danger(error);
		});
	}

	cargarProyectos2(id_cc: string) {
		if(id_cc == '') {
			this.banderaProyecto2 = true;		
			this.proyecto2 = '';
			this.banderaFase2 = true;		
			this.fase2 = '';
			this.banderaPartida2 = true;
			this.partida2 = '';
			this.saldo2 = '';
			this.banderaSaldo2 = false;
			this.banderaImporte = true;
			this.importe = '';
			this.banderaGuardar = true;
			return;
		}
		this.banderaProyecto2 = false;		
		this.banderaFase2 = true;		
		this.fase2 = '';
		this.banderaPartida2 = true;
		this.partida2 = '';
		this.saldo2 = '';
		this.banderaSaldo2 = false;
		this.banderaImporte = true;
		this.importe = '';
		this.banderaGuardar = true;

		this.cambioEgresos.get_cc(id_cc).subscribe((info_cc: any) => {
			// console.log('info_cc', info_cc);
			this.info_cc_destino = info_cc;
		});		

		this.cambioEgresos.get_proyectosActuales(id_cc).subscribe((proyectos: any) => {
			// console.log('proyectos', proyectos);
			this.proyectos2 = proyectos.data;
		}, error => {
			this.mensaje.danger(error);
		});
	}

	cargarFases2(id_proyecto: string) {
		if(id_proyecto == '') {
			this.banderaFase2 = true;
			this.fase2 = '';	
			this.banderaPartida2 = true;
			this.partida2 = '';
			this.saldo2 = '';
			this.banderaSaldo2 = false;
			this.banderaImporte = true;
			this.importe = '';
			this.banderaGuardar = true;
			return;
		}
		this.banderaFase2 = false;		
		this.banderaPartida2 = true;
		this.partida2 = '';
		this.saldo2 = '';
		this.banderaSaldo2 = false;
		this.banderaImporte = true;
		this.importe = '';
		this.banderaGuardar = true;

		this.cambioEgresos.get_fasesActuales(id_proyecto).subscribe((fases: any) => {
			// console.log('fases', fases);
			this.fases2 = fases.data;
		}, error => {
			this.mensaje.danger(error);
		});
	}

	cargarPartidas2(id_fase: string) {
		if(id_fase == '') {
			this.banderaPartida2 = true;
			this.partida2 = '';
			this.saldo2 = '';
			this.banderaSaldo2 = false;
			this.banderaImporte = true;
			this.importe = '';
			this.banderaGuardar = true;
			return;
		}
		this.banderaPartida2 = false;
		this.saldo2 = '';
		this.banderaSaldo2 = false;
		this.banderaImporte = true;
		this.importe = '';
		this.banderaGuardar = true;

		this.cambioEgresos.get_partidasActuales(id_fase).subscribe((partidas: any) => {
			// console.log('partidas', partidas);
			this.partidas2 = partidas.data;
		}, error => {
			this.mensaje.danger(error);
		});
	}

	cargarInfoPartida1(id_partida: string) {
		if(id_partida != '') {
			this.banderaSaldo1 = true;
			// CARGAR LA INFO DE LA PARTIDA SELECCIONADA
			this.cambioEgresos.getFasePartidaById(id_partida).subscribe((fase_partida: any) => {
				// console.log('info_fase_partida1', fase_partida.data);
				this.saldo1 = fase_partida.data.importe;
				this.validarMovimiento();
			});			
		} else {
			let mensaje = {
				titel: 'Error',
				message: 'Por favor elija ua partida para continuar'
			}
			this.banderaSaldo1 = false;

			return this.mensaje.danger(mensaje);
		}
		
	}

	cargarInfoPartida2(id_partida: string) {
		if(id_partida != '') {
			this.banderaSaldo2 = true;
			// CARGAR LA INFO DE LA PARTIDA SELECCIONADA
			this.cambioEgresos.getFasePartidaById(id_partida).subscribe((fase_partida: any) => {
				// console.log('info_fase_partida2', fase_partida);
				this.saldo2 = fase_partida.data.importe;
				this.validarMovimiento();
			});
		} else {
			let mensaje = {
				titel: 'Error',
				message: 'Por favor elija ua partida para continuar'
			}
			this.banderaSaldo2 = false;

			return this.mensaje.danger(mensaje);
		}
	}

	validarMovimiento() {

		if(this.partida1 == '' && this.partida2 == '') {
			this.banderaImporte = true;
			this.importe = '';
			const mensaje = {
				title: 'Precaución',
				message: 'Por favor seleccione las partidas.'				
			};
			return this.mensaje.warning(mensaje);
		} else {
			if(this.partida1 === this.partida2) {
				this.banderaImporte = true;
				this.importe = '';
				const mensaje = {
					title: 'Error',
					message: 'No se puede transferir dinero a una misma partida.'				
				};
				return this.mensaje.danger(mensaje);
			} else {
				if(this.partida1 != '' && this.partida2 != '') {
					this.banderaImporte = false;
					this.banderaGuardar = false;
				} else {
					this.banderaImporte = true;
					this.banderaGuardar = true;				
				}
			}	
		}	
	}


	limpiarCampos() {
		this.centro1 = '';
		this.centro2 = '';
		this.proyecto1 = '';
		this.proyecto2 = '';
		this.banderaProyecto1 = true;
		this.banderaProyecto2 = true;
		this.fase1 ='';
		this.fase2 ='';
		this.banderaFase1 = true;
		this.banderaFase2 = true;
		this.partida1 = '';
		this.partida2 = '';
		this.banderaPartida1 = true;
		this.banderaPartida2 = true;
		this.saldo1 = '';
		this.banderaSaldo1 = false;
		this.saldo2 = '';
		this.banderaSaldo2 = false;
		this.importe = '';
		this.banderaImporte = true;
	}

	guardar() {
		if(this.importe == '') {
			const mensaje = {
				title: 'Error',
				message: 'Por favor ingrese la cantidad a transferir.'				
			};
			return this.mensaje.danger(mensaje);
		} else {
			console.log(
				['importe partida 1', Number(this.saldo1)],
				['importe', Number(this.importe)]
			);
			if(Number(this.importe) > Number(this.saldo2)) {
				console.log('importe mayor');
				const mensaje = {
					title: 'Error',
					message: 'El importe ingresado no puede ser mayor al importe de la partida de origen.'				
				};
				return this.mensaje.danger(mensaje);
			} else {
				console.log('importe menor');
				this.movimiento = {
					tipo_movimiento: 'T',
					id_cc_origen: this.info_cc_origen.id,
					cc_origen: this.info_cc_origen.nombre,
					id_partida_origen: this.partida1,
					id_cc_destino: this.info_cc_destino.id,
					cc_destino: this.info_cc_destino.nombre,
					id_partida_destino: this.partida2,
					importe: this.importe,
					id_cc: this.id_cc
				}; 
	
				// console.log('Guardar', this.movimiento);
				this.cambioEgresos.create_movimiento(this.movimiento).subscribe(( data: any ) => {
					// console.log('data', data);
					return this.mensaje.success(data);
					
				}, error => {
					// console.log(error);
					return this.mensaje.danger(error.error); 
				});

				this.inicio();
			}
		}		 
	}

	cancelar() {
        this.router.navigate(['panel-adm/modificar_egreso']);
    }

}
