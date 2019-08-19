import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';
import { Empresas, UnidadesAdmin, Ccosto, Ctrabajo } from 'src/app/interfaces/ui.interface';


@Component({
	selector: 'app-ui',
	templateUrl: './ui.component.html',
	styles: []
})
export class UiComponent implements OnInit {
	@Input() primary_keys_ui: any;
	empresas: Empresas[];
	unidades: UnidadesAdmin[];
	ccostos: Ccosto[];
	ctrabajos: Ctrabajo[];
	data: any;
	data2: any;
	nombre_clas = false;


	id_centro_costo: any; /// lkasgdkjasgdkjas

	@Output() out = new EventEmitter<any>();

	constructor(
		private ui_service: UiService
	) {
		this.data = {
			id_empresa: '',
			id_unidad: '',
			id_ccosto: '',
			id_ctrabajo: ''
		};
		this.data2 = {
			id_ctrabajo: '',
			sub_codigo: '',
			sub_nombre: '',
			clas_codigo: '',
			clas_nombre: ''
		};
	}

	ngOnInit() {
		this.ui_service.getEmpresa(1)
			.subscribe((data: any) => {
				this.empresas = data;
				console.log(this.empresas);
			});

		if (this.primary_keys_ui[0] !== 0) {
			this.onChangeEmpresa(this.primary_keys_ui[0]);
			this.onChangeUnidad(this.primary_keys_ui[1]);
			this.onChangeCcosto(this.primary_keys_ui[2]);
		}
		this.onChangeEmpresa(1);
	}

	onChangeEmpresa(id_empresa) {
		this.data.id_unidad = '';
		this.data.id_ccosto = '';
		this.data.id_ctrabajo = '';

		this.unidades = [];
		this.ccostos = [];
		this.ctrabajos = [];
		if (id_empresa !== '') {
			this.data.id_empresa = id_empresa;
			this.ui_service.getUnisEmpresa(id_empresa)
				.subscribe((data: any) => {
					this.unidades = data;
				});
			this.ui_service.getEmpresa_class(id_empresa)
				.subscribe((data2: any) => {
					this.data2.clas_codigo = data2[0].codigo;
					this.data2.clas_nombre = data2[0].nombre;
			});
		}
		this.nombre_clas = false;
	}

	onChangeUnidad(id_unidad) {
		this.data.id_ccosto = '';
		this.data.id_ctrabajo = '';

		this.ccostos = [];
		this.ctrabajos = [];
		if (id_unidad !== '') {
			// this.data.id_unidad = id_unidad;
			this.ui_service.getCcsUnidad(id_unidad)
				.subscribe((data1: any) => {
					if ( data1.length !== 0) {
						this.ui_service.getSubfuncion(data1[0].id_subfuncion)
						.subscribe((data2: any) => {
							this.data2.sub_codigo = data2.codigo;
							this.data2.sub_nombre = data2.nombre;
						});
					}
					this.ccostos = data1;
				});
		}
		this.nombre_clas = false;
	}

	onChangeCcosto(id_ccosto) {
		this.data.id_ctrabajo = '';

		this.ctrabajos = [];
		if (id_ccosto !== '') {
			// this.data.id_ccosto = id_ccosto;
			this.ui_service.getCtsCcosto(id_ccosto)
				.subscribe((data: any) => {
					this.ctrabajos = data;
				});
			this.id_centro_costo = id_ccosto;
			this.data2.id_ctrabajo = this.id_centro_costo;
			this.out.emit(this.data2);
		}
		this.nombre_clas = true;
	}

}