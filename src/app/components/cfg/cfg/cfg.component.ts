import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Finalidad, Funciones, Subfunciones } from 'src/app/interfaces/cfg.interface';
import { CfgService } from 'src/app/services/cfg/cfg.service';


@Component({
	selector: 'app-cfg',
	templateUrl: './cfg.component.html',
	styles: []
})
export class CfgComponent implements OnInit {
	@Input() primary_keys_cfg: any;
	finalidades: Finalidad[];
	funciones: Funciones[];
	subfunciones: Subfunciones[];
	data: any;

	@Output() out = new EventEmitter<any>();

	constructor(
		private cfg_service: CfgService
	) {
		this.data = {
			id_finalidad: '',
			id_funcion: '',
			id_subfuncion: ''
		};
		this.out.emit(this.data);
	}

	ngOnInit() {
		this.cfg_service.getFinalidades()
			.subscribe((data: any) => {
				this.finalidades = data;
			});

		if (this.primary_keys_cfg[0] !== 0) {
			this.onChangeFinalidad(this.primary_keys_cfg[0]);
			this.onChangeFuncion(this.primary_keys_cfg[1]);
			this.onChangeSubfuncion(this.primary_keys_cfg[2]);
		}
	}

	onChangeFinalidad(id_finalidad) {
		this.data.id_finalidad = '';
		this.data.id_funcion = '';
		this.data.id_subfuncion = '';
		this.funciones = [];
		this.subfunciones = [];
		if (id_finalidad !== '') {
			this.data.id_finalidad = id_finalidad;
			this.cfg_service.getFunsFinalidad(id_finalidad)
				.subscribe((data: any) => {
					this.funciones = data;
				});
		}
	}

	onChangeFuncion(id_funcion) {
		this.data.id_subfuncion = '';
		this.subfunciones = [];
		if (id_funcion !== '') {
			this.data.id_funcion = id_funcion;
			this.cfg_service.getSubsFuncion(id_funcion)
				.subscribe((data: any) => {
					this.subfunciones = data;
				});
		}
	}

	onChangeSubfuncion(id_subfuncion) {
		this.data.id_subfuncion = id_subfuncion;
		this.out.emit(this.data);
	}
}