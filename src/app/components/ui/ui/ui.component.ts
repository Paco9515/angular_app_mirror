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
		this.out.emit(this.data);
	}

	ngOnInit() {
		this.ui_service.getEmpresas()
			.subscribe((data: any) => {
				this.empresas = data;
				console.log('empresa', this.empresas);
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
		}
	}

	onChangeUnidad(id_unidad) {
		this.data.id_ccosto = '';
		this.data.id_ctrabajo = '';
		this.ccostos = [];
		this.ctrabajos = [];
		if (id_unidad !== '') {
			this.data.id_unidad = id_unidad;
			this.ui_service.getCcsUnidad(id_unidad)
				.subscribe((data1: any) => {
					if ( data1.length !== 0) {
						this.ui_service.getSubfuncion(data1[0].id_subfuncion)
						.subscribe((data2: any) => {
							this.data.sub_id = data2.codigo;
							this.data.sub_nombre = data2.nombre;
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
			this.data.id_ccosto = id_ccosto;
			this.ui_service.getCtsCcosto(id_ccosto)
				.subscribe((data: any) => {
					this.ctrabajos = data;
				});
		}
	}

	onChangeCtrabajo(id_ctrabajo) {
		this.data.id_ctrabajo = id_ctrabajo;
		this.out.emit(this.data);
	}
}