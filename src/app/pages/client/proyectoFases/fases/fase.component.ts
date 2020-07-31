import { Component, ViewChild, OnInit } from '@angular/core';
import { FaseService } from 'src/app/common/services/pe/fase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fases, PartidaFase } from 'src/app/common/interfaces/pe.interface';
import { NgForm } from '@angular/forms';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { CogComponent } from '../../../../components/classification/clasfObjetoGasto/cog.component';
import { CffComponent } from '../../../../components/classification/clasfFuenteFinanciamiento/cff.component';

@Component({
	selector: 'app-fase',
	templateUrl: './fase.component.html'
})
export class FaseComponent { //implements OnInit {
	@ViewChild(CogComponent, { static: true }) cog_component: CogComponent;
	@ViewChild(CffComponent, { static: true }) cff_component: CffComponent;

	cog_keys = ['0', '0', '0'];
	cog_data: any;
	cff_keys = ['0', '0', '0'];
	cff_data: any;

	proyecto: string;
	presupuesto: string;
	fase: Fases;
	asentamientos: any[] = [];

	partidas: PartidaFase[] = [];
	partidasEliminadasAlEditar: any[] = [];
	// verifica si la fase se esta editando
	editar: boolean;
	id_fase: string = null;
	importe: number = null;
	total: number = 0;
	tipo_asentamiento = '';
	zona_asentamiento = '';

	originalTipo: any = '';
	nuevoTipo: any = '';

	bandera: boolean;

	envioInformacion: any = {
		fase: null,
		partidasEliminadas: null
	};

	faseHistorial: Fases;
	envioInfoHistorial = {
		fase: null
	};


	constructor(
		private faseService: FaseService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService,
		private router: Router
	) {
		
		this.resetVariable();
		// console.log('cff_component', this.cff_component);
		this.bandera = false;
		this.activatedRoute.params.subscribe((data: any) => {
			this.proyecto = data['id_proyecto'];
			this.presupuesto = data['id_presupuesto'];
			if(data['bandera'] != null) {
				this.bandera = true;
			} else {
				this.bandera = false;
			}
			this.editar = false;
			if (data.id_fase !== 'nuevo') {
				this.id_fase =  data.id_fase;
				this.editar = true;
				this.getFase(this.id_fase);
			}
		});
	}

	eliminarPartida(id: any, partida: PartidaFase) {
		this.total -= Number(partida.importe);		
		this.partidas.splice(id, 1);
		if (this.editar && partida.id) {
			this.partidasEliminadasAlEditar.push(partida.id);
		}
	}

	private resetVariableEnvio() {
		this.envioInformacion = {
			fase: null,
			partidasEliminadas: null
		};
		this.envioInfoHistorial = {
			fase: null
		};
	}
	
	public resetVariable() {
		this.cog_keys = ['0', '0', '0'];
		// cog_data: any;
		this.cff_keys = ['0', '0', '0'];
		// cff_data: any;
		this.fase = {
			id: '',
			id_proyecto: '',
			id_tipo_financ: '',
			id_subfuente: '',
			id_fuente: '',
			codigo: '',
			nombre: '',
			descripcion: '',
			externo: false,
			codigo_postal: '',
			estado: '',
			municipio: '',
			id_ubicacion_geografica: '',
			asentamiento: '',
			tipo_asentamiento: '',
			zona_asentamiento: '',
			calle: '',
			num_exterior: null,
			num_interior: null,
			deleted: false,
			partidas: null
		};

		this.faseHistorial = {
			id: '',
			id_proyecto: '',
			id_tipo_financ: '',
			id_subfuente: '',
			id_fuente: '',
			codigo: '',
			nombre: '',
			descripcion: '',
			externo: false,
			codigo_postal: '',
			estado: '',
			municipio: '',
			id_ubicacion_geografica: '',
			asentamiento: '',
			tipo_asentamiento: '',
			zona_asentamiento: '',
			calle: '',
			num_exterior: null,
			num_interior: null,
			deleted: false,
			partidas: null
		};
	}

	getDataCOG(data: any) {
		this.cog_data = data;
	}

	getDataCFF(data: any) {
		this.cff_data = data;
		// console.log('data', data);
	}

	getFase(id: string) {
		this.faseService.getFase(id)
			.subscribe((obj: any) => {
				this.fase = obj.data[0];
				this.partidas = obj.data[1];
				// datos de ubicacion interna eliminados
				if (!this.fase.externo) {
					this.fase.codigo_postal = '';
					this.fase.estado = '';
					this.fase.municipio = '';
					this.fase.id_ubicacion_geografica = '';
					this.fase.asentamiento = '';
					this.fase.tipo_asentamiento = '';
					this.fase.zona_asentamiento = '';
					this.fase.calle = '';
					this.fase.num_exterior = null;
					this.fase.num_interior = null;
				} else {
					this.getDireccion(this.fase.codigo_postal);
				}

				this.cff_component.onChangeFuente(this.fase.id_fuente);
				this.cff_component.onChangeSubfuente(this.fase.id_subfuente);
				this.cff_component.onChangeTipo(this.fase.id_tipo_financ);

				this.total = this.partidas.reduce(( sum, partida )  => sum + (Number(partida.importe)), 0);

				// console.log('fase: ', this.fase);
				// console.log('total: ', this.total);
			});

		// console.log('id_fase:', this.fase.id);
		this.faseService.getFase(id).subscribe((obj1: any) => {
			this.faseHistorial = obj1.data[0];
			this.faseHistorial.partidas = obj1.data[1];
			this.envioInfoHistorial.fase = this.faseHistorial;
		});
	}

	getDireccion($cp) {
		if ($cp !== '') {
			this.faseService.get_asentamientos_cp($cp)
				.subscribe((response: any) => {
					response = response.data;
					if (response.asentamientos !== [] && response.municipio !== ''  && response.estado !== '' ) {
						this.fase.estado = response.estado;
						this.fase.municipio = response.municipio;
						this.asentamientos = response.asentamientos;
						return;
					}
				}, error => {
					return this.mensaje.warning(error.error);
				});
		}
	}

	agregarPartida() {
		if (this.importe >= 0) {
			this.total += Number(this.importe);
			this.partidas.push({
				id_partida: this.cog_data.id_partida,
				id_fase: this.id_fase,
				codigo_partida: this.cog_data.codigo_partida,
				nombre_partida: this.cog_data.nombre_partida,
				importe: Number(this.importe)
			});
			this.importe = null;
			this.cog_component.restartVariables();
			return;
		}
		const MENSAJE: any = {
			'message': 'No se aceptan importe negativos',
			'title': 'Advertencia'
		};
		return this.mensaje.warning(MENSAJE);
	}

	obtener_asentamiento(id_asentamiento: any) {
		this.fase.tipo_asentamiento = '';
		this.fase.zona_asentamiento = '';
		this.asentamientos.forEach((dato) => {
			if (dato.id == id_asentamiento) {
				this.fase.tipo_asentamiento = dato.tipo_asentamiento;
				this.fase.zona_asentamiento = dato.zona_asentamiento;
			}
		});
	}

	guardar(f: NgForm) {
		this.fase.id_proyecto = this.proyecto;
		this.fase.id_tipo_financ = this.cff_data.id_tipo_financ;
		this.fase.partidas = this.partidas;
		this.envioInformacion.fase = this.fase;
		this.envioInformacion.partidasEliminadas = this.partidasEliminadasAlEditar;
		
		if(!f.invalid && this.envioInformacion.fase.id_tipo_financ != '') {
			if(this.envioInfoHistorial.fase != null) {
				if(Number(this.envioInformacion.fase.id_tipo_financ) == Number(this.envioInfoHistorial.fase.id_tipo_financ)) {
					if(!f.dirty) {
						console.log('no se toco algo');
						// this.banderaHistorial = false;
					} else {
						console.log('si se toco el form pero no la fuente');
						if (this.bandera && this.fase.id !== '') {
							this.faseService.guardarHistorial(this.envioInfoHistorial)
								.subscribe((data: any) => { }, error => { });
						}
					}			
				} else {
					if(f.dirty){
						console.log('si se toco la fuente y el form');
						if (this.bandera && this.fase.id !== '') {
							// this.banderaHistorial = true;
							this.faseService.guardarHistorial(this.envioInfoHistorial)
								.subscribe((data: any) => { }, error => { });
						}
					} else {
						console.log('si se toco la fuente y no form');
						if (this.bandera && this.fase.id !== '') {
							// this.banderaHistorial = true;
							this.faseService.guardarHistorial(this.envioInfoHistorial)
								.subscribe((data: any) => { }, error => { });
						}
					}
				}
			}

			/* console.log('proyecto', this.proyecto);
			console.log('presupuesto', this.presupuesto);
			console.log('bandera_modEgreso', this.bandera);
			console.log('editar', this.editar); */
			

			this.faseService.createUpdateFase(this.envioInformacion)
				.subscribe((data: any) => {
					// console.log(data);
					this.resetVariableEnvio();
					this.partidasEliminadasAlEditar = [];
					if(this.bandera) {
						this.mensaje.success(data, 'panel-adm/mod_fases/'+this.presupuesto+'/proyectos/'+this.proyecto+'/fases/true');					
					} else {
						this.mensaje.success(data, 'panel-adm/pres_egresos/'+this.presupuesto+'/proyectos/'+this.proyecto+'/fases');					
					}
					
				}, error => {
					// console.log(error);
					this.mensaje.danger(error.error);
					// this.inicio();
				});
		}

		// console.log('info', this.envioInformacion);
		// console.log('historial', this.envioInfoHistorial);

	}

	regresar() {
		if (!this.bandera) {
			this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos/${this.proyecto}/fases`]);
		} else {
			this.router.navigate([`/panel-adm/mod_fases/${this.presupuesto}/proyectos/${this.proyecto}/fases`, this.bandera]);
		}
	}

	cerrarModal() {
		this.importe = null;
		this.cog_component.restartVariables();
	}

}
