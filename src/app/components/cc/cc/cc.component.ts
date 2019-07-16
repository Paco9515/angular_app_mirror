import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CcService } from 'src/app/services/cc/cc.service';
import { Grupos, Generos, Rubros, Cuentas, Subcuentas } from '../../../interfaces/cc.interface';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html'
})
export class CcComponent implements OnInit {

	@Input() primary_keys_cc: any;
	subcuentas: Subcuentas[];
	cuentas: Cuentas[];
	rubros: Rubros[];
	grupos: Grupos[];
	generos: Generos[];
	data: any;

	@Output() cog = new EventEmitter<any>();

	constructor(
		private ccService: CcService
	) {
		this.data = {
			id_genero: '',
			id_grupo: '',
			id_rubro: '',
			id_cuenta : '',
			id_subcuenta: ''
		};

		this.cog.emit(this.data);
	}

	ngOnInit() {
		this.ccService.getGeneros()
			.subscribe((data: any) => {
				this.generos = data;
			});

		if (this.primary_keys_cc[0] !== 0) {
			this.onChangeGenero(this.primary_keys_cc[0]);
			this.onChangeGrupos(this.primary_keys_cc[1]);
			this.onChangeRubros(this.primary_keys_cc[2]);
			this.onChangeCuentas(this.primary_keys_cc[3]);
			this.onChangeSubcuentas(this.primary_keys_cc[4]);
		}
	}

	onChangeGenero(id_genero) {
		this.data.id_grupo = '';
		this.data.id_rubro = '';
		this.data.id_cuenta = '';
		this.data.id_subcuenta = '';

		this.grupos = [];
		this.rubros = [];
		this.cuentas = [];
		this.subcuentas = [];

		if (id_genero !== '') {
			this.data.id_genero = id_genero;
			this.ccService.get_grupos_genero(id_genero)
				.subscribe((data: any) => {
					this.grupos = data;
				});
		}
	}

	onChangeGrupos(id_grupo) {
		this.data.id_rubro = '';
		this.data.id_cuenta = '';
		this.data.id_subcuenta = '';

		this.rubros = [];
		this.cuentas = [];
		this.subcuentas = [];

		if (id_grupo !== '') {
			this.data.id_grupo = id_grupo;
			this.ccService.get_rubros_grupo(id_grupo)
				.subscribe((data: any) => {
					this.rubros = data;
				});
		}
	}

	onChangeRubros(id_rubro) {
		this.data.id_cuenta = '';
		this.data.id_subcuenta = '';

		this.cuentas = [];
		this.subcuentas = [];

		if (id_rubro !== '') {
			this.data.id_rubro = id_rubro;
			this.ccService.get_cuentas_rubro(id_rubro)
				.subscribe((data: any) => {
					this.cuentas = data;
				});
		}
	}

	onChangeCuentas(id_cuenta) {
		this.data.id_subcuenta = '';

		this.subcuentas = [];

		if (id_cuenta !== '') {
			this.data.id_cuenta = id_cuenta;
			this.ccService.get_subcuentas_cuenta(id_cuenta)
				.subscribe((data: any) => {
					this.subcuentas = data;
				});
		}
	}

	onChangeSubcuentas(id_subcuenta) {
		this.data.id_subcuenta = id_subcuenta;
		this.cog.emit(this.data);
	}

}
