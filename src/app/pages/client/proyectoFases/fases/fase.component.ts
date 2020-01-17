import { Component, ViewChild, OnInit } from '@angular/core';
import { FaseService } from 'src/app/common/services/pe/fase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fases } from 'src/app/common/interfaces/pe.interface';
import { NgForm } from '@angular/forms';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';
import { CogComponent } from '../../../../components/classification/clasfObjetoGasto/cog.component';
import { CffComponent } from '../../../../components/classification/clasfFuenteFinanciamiento/cff.component';

@Component({
	selector: 'app-fase',
	templateUrl: './fase.component.html'
})
export class FaseComponent implements OnInit {
	@ViewChild(CogComponent) cog_component: CogComponent;
	@ViewChild(CffComponent) cff_component: CffComponent;

	cog_keys = ['0', '0', '0'];
	cog_data: any;
	cff_keys = ['0', '0', '0'];
	cff_data: any;

	proyecto: string;
	presupuesto: string;
	fase: Fases;
	asentamientos: any[] = [];

	partidas: any[] = [];
	importe: number = null;
	total: number = 0;
	tipo_asentamiento = '';
	zona_asentamiento = '';

	constructor(
		private faseService: FaseService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService,
		private router: Router
	) {
		this.resetVariable();
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((data: any) => {
			this.proyecto = data['id_proyecto'];
			this.presupuesto = data['id_presupuesto'];
			if (data.id_fase !== 'nuevo') {
				return this.getFase(data.id_fase);
			}
		});
	}

	eliminarPartida(id: any, importe: number){
		this.total -= importe;
		this.partidas.splice(id, 1);
	}

	public resetVariable() {
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
			status: false,
			partidas: null
		};
	}

	getDataCOG(data: any) {
		this.cog_data = data;
	}

	getDataCFF(data: any) {
		this.cff_data = data;
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

				this.cff_keys = [
					this.fase.id_fuente,
					this.fase.id_subfuente, 
					this.fase.id_tipo_financ
				];

				this.total = this.partidas.reduce(( sum, partida )  => sum + (partida.importe), 0);

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
				}), error => {
					return this.mensaje.warning(error.error);
				};
		}
	}

	agregarPartida() {
		if (this.importe >= 0) {
			this.total += this.importe;
			this.partidas.push({
				id_partida: this.cog_data.id_partida,
				partida: this.cog_data.codigo_partida + ' - ' + this.cog_data.nombre_partida,
				importe: this.importe
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
			if(dato.id == id_asentamiento) {
				this.fase.tipo_asentamiento = dato.tipo_asentamiento
				this.fase.zona_asentamiento = dato.zona_asentamiento
				return;
			}
		});
	}

	guardar(f: NgForm) {
		this.fase.id_proyecto = this.proyecto;
		this.fase.id_tipo_financ = this.cff_data.id_tipo;
		this.fase.partidas = this.partidas;
		this.faseService.createUpdateFase(this.fase)
			.subscribe((data: any) => {
				return this.mensaje.success(data);
			}, error => {
				return this.mensaje.danger(error.error);
			});
	}

	regresar() {
		this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos/${this.proyecto}/fases`]);
	}

}
