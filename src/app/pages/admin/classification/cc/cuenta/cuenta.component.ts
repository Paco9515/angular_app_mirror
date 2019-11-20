import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupos, Generos, Rubros, Cuentas } from '../../../../../common/interfaces/cc.interface';
import { CuentaService } from 'src/app/common/services/cc/cuenta.service';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';

@Component({
	selector: 'app-cuenta',
	templateUrl: './cuenta.component.html',
	styles: []
})

export class CuentaComponent implements OnInit {

	cuenta: Cuentas;
	rubros: Rubros[];
	grupos: Grupos[];
	generos: Generos[];

	grupo = true;
	rubro = true;

	constructor(
		private cuentaService: CuentaService,
		private activitedRoute: ActivatedRoute,
		private mensaje: MensajesService
	) {
		this.cuenta = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_genero: '',
			id_grupo: '',
			id_rubro: ''
		};
	}

	ngOnInit() {
		this.cuentaService.getGeneros()
			.subscribe((data: any) => {
				this.generos = data;
			});

		this.activitedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarCuenta(data.id);
			}
		});
	}

	onChangeGenero(id_genero) {
		this.cuenta.id_grupo = '';
		this.grupos = [];
		this.cuenta.id_rubro = '';
		this.rubros = [];

		this.grupo = false;
		this.rubro = true;

		if (id_genero !== '') {
			this.cuenta.id_genero = id_genero;
			this.cuentaService.getGruposGenero(id_genero)
			.subscribe((obj: any) => {
				this.grupos = obj.data;
			});
		}
	}

	onChangeGrupo(id_grupo) {
		this.cuenta.id_rubro = '';
		this.rubros = [];

		this.rubro = false;

		if (id_grupo !== '') {
			this.cuenta.id_grupo = id_grupo;
			this.cuentaService.getRubrosGrupo(id_grupo)
			.subscribe((obj: any) => {
				this.rubros = obj.data;
			});
		}
	}

	onChangeRubro(id_rubro) {
		this.cuenta.id_rubro = id_rubro;
	}

	cargarCuenta(id: string) {
		this.cuentaService.getCuenta(id)
			.subscribe((obj: any) => {
				this.cuenta = obj.data;
				const GRUPO = this.cuenta.id_grupo;
				const RUBRO = this.cuenta.id_rubro;
				this.onChangeGenero(this.cuenta.id_genero);
				this.onChangeGrupo(GRUPO);
				this.onChangeRubro(RUBRO);
			},
			error => {
				this.mensaje.danger(error.error,'panel-adm/cuentas');
			});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.cuentaService.createUpdateCuenta(this.cuenta)
				.subscribe((data: any) => {
					this.mensaje.success(data);
			}, error => {
				this.mensaje.danger(error.error);
			});
		}
	}

}
