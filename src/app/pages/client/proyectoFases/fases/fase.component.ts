import { Component, ViewChild } from '@angular/core';
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
export class FaseComponent {
	@ViewChild(CogComponent) cog_component: CogComponent;
	@ViewChild(CffComponent) cff_component: CffComponent;

	cog_keys = ['0', '0', '0'];
	cog_data: any;
	cff_keys = ['0', '0', '0'];
	cff_data: any;

	proyecto: string;
	presupuesto: string;
	fase: Fases;
	colonias: any;
	partidas: any[] = [];
	importe: number = null;
	total: number = 0;

	constructor(
		private faseService: FaseService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService,
		private router: Router
	) {
		this.resetVariable();
		this.activatedRoute.params.subscribe((data: any) => {
			this.proyecto = data['id_proyecto'];
			this.presupuesto = data['id_presupuesto'];
			if (data.id_fase !== 'nuevo') {
				this.getFase(data.id_fase);
			}
		});
	}

	eliminarPartida(id: any, importe: number) {
		this.total -= importe;
		this.partidas.splice(id, 1);
	}

	resetVariable() {
		this.fase = {
			id: '',
			id_proyecto: '',
			id_tipo_financ: '',
			codigo: '',
			nombre: '',
			descripcion: '',
			externo: false,
			cp: '',
			entidad: '',
			municipio: '',
			colonia: '',
			domicilio: '',
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
				this.cff_keys = [this.fase.id_subfuente, this.fase.id_tipo_financ, this.fase.id_fuente];
		
				this.partidas.forEach(partida => {
					this.total += partida.importe;
				});

				// this.cff_keys[];

				// this.partidas.forEach(function(partida) {
				// 	this.importe = this.importe + partida.importe;
				// }, this);

				// if (this.fase.externo) {
				// 	this.getDireccion(this.fase.cp);
				// }
			});
	}

	getDireccion($cp) {
		if ($cp !== '') {
			this.faseService.getDireccionCP($cp)
			.subscribe((response: any) => {
				if (response.colonias !== [] && response.municipio !== ''  && response.estado !== '' ) {
					this.fase.entidad = response.estado;
					this.fase.municipio = response.municipio;
					this.colonias = response.colonias;
				} else {
					const MENSAJE: any = {
							'message': 'El codigo postal no es valido',
							'title': 'Advertencia'
						};
						this.mensaje.warning(MENSAJE);
					}
				});
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

	guardar(f: NgForm) {
		this.fase.id_proyecto = this.proyecto;
		this.fase.id_tipo_financ = this.cff_data.id_tipo;
		this.fase.partidas = this.partidas;
		this.faseService.createUpdateFase(this.fase)
			.subscribe((data: any) => {
				this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
	}

	regresar() {
		this.router.navigate([`/panel-adm/pres_egresos/${this.presupuesto}/proyectos/${this.proyecto}/fases`]);
	}



}
