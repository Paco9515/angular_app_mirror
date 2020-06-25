import { Component, OnInit } from '@angular/core';
// import { PresupuestoEgresoService } from '../../../../../common/services/presupuesto/egreso.service';
import { Router } from '@angular/router';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';
import { CambioEgresoService } from 'src/app/common/services/presupuesto/cambioEgreso';


@Component({
	selector: 'app-aumentarDisminuir',
	templateUrl: './aumentarDisminuir.component.html',
	styles: []
})
export class AumentarDisminuirComponent {

	movimiento: any;
	info_cc: any;
	tipoMov: string;
	id_cc: string;
	id_user: string;
	cc_origen: string;
	centro1: string;
	centros1: any;
	proyecto1: string;
	proyectos1: any; 
	fase1: string;
	fases1: any;
	partida1: string;
	partidas1: any;
	saldo1: string;
	importe: string;

	banderaContent: boolean;
	banderaProyecto1: boolean;
	banderaFase1: boolean;
	banderaPartida1: boolean;
	banderaImporte: boolean;
	banderaGuardar: boolean;
	banderaSaldo1: boolean;

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

	inicio() {
		this.info_cc= '';
		this.tipoMov = '';
		this.banderaContent = false;
		this.centro1 = '';		
		this.proyecto1 = '';		
		this.banderaProyecto1 = true;		
		this.fase1 ='';		
		this.banderaFase1 = true;		
		this.partida1 = '';		
		this.banderaPartida1 = true;		
		this.saldo1 = '';		
		this.importe = '';
		this.banderaImporte = true;
		this.banderaGuardar = true;
		this.banderaSaldo1 = false;		
		this.movimiento = {
			tipo_movimiento: '',
			centro: '',
			id_partida: '',
			importe: '',
			id_cc: ''			
		};

		this.cambioEgresos.get_arbol(this.id_cc).subscribe((cc: any) => {			
			this.centros1 = cc;			
		});
		
	}

	seleccionTipo() {
		if(this.tipoMov != '') {
			console.log('TipoMov', this.tipoMov);
			this.banderaContent = true;
		} else {
			this.banderaContent = false;
			let mensaje = {
				tittle: 'Error',
				mesage: 'Elija una opción valida.'
			}
			return this.mensaje.danger(mensaje);
		}
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
			// console.log('info_cc', info_cc);
			this.info_cc = info_cc;
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

	validarMovimiento() {

		if(this.partida1 == '') {
			this.banderaImporte = true;
			this.importe = '';
			const mensaje = {
				title: 'Precaución',
				message: 'Por favor seleccione una partidas.'				
			};
			this.banderaImporte = true;
			this.banderaGuardar = true;	
			return this.mensaje.warning(mensaje);
		} else {			
			this.banderaImporte = false;
			this.banderaGuardar = false;		
		}	
	}


	limpiarCampos() {
		this.centro1 = '';		
		this.proyecto1 = '';		
		this.banderaProyecto1 = true;		
		this.fase1 ='';		
		this.banderaFase1 = true;		
		this.partida1 = '';		
		this.banderaPartida1 = true;		
		this.saldo1 = '';
		this.banderaSaldo1 = false;				
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
			console.log('importe menor');
			this.movimiento = {
				tipo_movimiento: this.tipoMov,
				id_cc_origen: this.info_cc.id,
				cc_origen: this.info_cc.nombre,
				id_partida_origen: this.partida1,
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

	cancelar() {
        this.router.navigate(['panel-adm/modificar_egreso']);
    }


}
