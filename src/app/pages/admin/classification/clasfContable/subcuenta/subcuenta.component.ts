import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubcuentaService } from 'src/app/common/services/cc/subcuenta.service';
import { Grupos, Generos, Rubros, Cuentas, Subcuentas } from '../../../../../common/interfaces/cc.interface';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';

@Component({
  selector: 'app-subcuenta',
  templateUrl: './subcuenta.component.html',
  styles: []
})
export class SubcuentaComponent implements OnInit {

	subcuenta: Subcuentas;
	cuentas: Cuentas[];
	rubros: Rubros[];
	grupos: Grupos[];
	generos: Generos[];

	grupo = true;
	rubro = true;
	cuenta = true;

	constructor(
		private subcuentaService: SubcuentaService,
		private activitedRoute: ActivatedRoute,
		private mensaje: MensajesService
	) {
		this.subcuenta = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_genero: '',
			id_grupo: '',
			id_rubro: '',
			id_cuenta: ''
		};
	}

	ngOnInit() {
		this.subcuentaService.getGeneros().subscribe((data: any) => {
			this.generos = data;
		});

		this.activitedRoute.params.subscribe(( data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarSubcuenta(data.id);
			}
		});
	}

	onChangeGenero(id_genero) {
		this.subcuenta.id_grupo = '';
		this.grupos = [];
		this.subcuenta.id_rubro = '';
		this.rubros = [];
		this.subcuenta.id_cuenta = '';
		this.cuentas = [];
		this.grupo = false;
		this.rubro = true;
		this.cuenta = true;
		if (id_genero !== '') {
			this.subcuenta.id_genero = id_genero;
			this.subcuentaService.getGruposGenero(id_genero)
			.subscribe((obj: any) => {
				this.grupos = obj.data;
			});
		}
	}

	onChangeGrupo(id_grupo) {
		this.subcuenta.id_rubro = '';
		this.rubros = [];
		this.subcuenta.id_cuenta = '';
		this.cuentas = [];
		this.rubro = false;
		this.cuenta = true;
		if (id_grupo !== '') {
			this.subcuenta.id_grupo = id_grupo;
			this.subcuentaService.getRubrosGrupo(id_grupo)
			.subscribe((obj: any) => {
				this.rubros = obj.data;
			});
		}
	}

	onChangeRubro(id_rubro) {
		this.subcuenta.id_cuenta = '';
		this.cuentas = [];
		this.cuenta = false;
		if (id_rubro !== '') {
			this.subcuenta.id_rubro = id_rubro;
			this.subcuentaService.getCuentasRubro(id_rubro)
			.subscribe((obj: any) => {
				this.cuentas = obj.data;
			});
		}
	}

	onChangeCuenta(id_cuenta) {
		this.subcuenta.id_cuenta = id_cuenta;
	}

	cargarSubcuenta(id: string) {
		this.subcuentaService.getSubcuenta(id).subscribe((obj: any) => {
			// console.log(obj);
			this.subcuenta = obj.data;
			const GRUPO = this.subcuenta.id_grupo;
			const RUBRO = this.subcuenta.id_rubro;
			const CUENTA = this.subcuenta.id_cuenta;
			this.onChangeGenero(this.subcuenta.id_genero);
			this.onChangeGrupo(GRUPO);
			this.onChangeRubro(RUBRO);
			this.onChangeCuenta(CUENTA);
		},
		error => {
			this.mensaje.danger(error.error, 'panel-adm/subcuentas');
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.subcuentaService.createUpdateSubcuenta(this.subcuenta)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}

}
