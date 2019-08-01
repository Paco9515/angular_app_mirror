import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';
import { Empresas, UnidadesAdmin, Ccosto, Ctrabajo } from 'src/app/interfaces/ui.interface';


@Component({
	selector: 'app-ui',
	templateUrl: './ui.component.html',
	styles: []
})
export class UiComponent implements OnInit {
	@Input() primary_keys: any;
	empresas: Empresas[];
	unidades: UnidadesAdmin[];
	ccostos: Ccosto[];
	ctrabajos: Ctrabajo[];
	data: any;
	data2: any;

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
		this.out.emit(this.data2);
	}

	ngOnInit() {
		this.ui_service.getEmpresas()
			.subscribe((data: any) => {
				this.empresas = data;
			});

		if (this.primary_keys[0] !== 0) {
			this.onChangeEmpresa(this.primary_keys[0]);
			this.onChangeUnidad(this.primary_keys[1]);
			this.onChangeCcosto(this.primary_keys[2]);
			this.onChangeCtrabajo(this.primary_keys[3]);
		}
	}

	onChangeEmpresa(id_empresa) {
		this.data.id_empresa = '';
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
		}
	}

	onChangeCtrabajo(id_ctrabajo) {
		this.data2.id_ctrabajo = id_ctrabajo;
		this.out.emit(this.data2);
	}
}