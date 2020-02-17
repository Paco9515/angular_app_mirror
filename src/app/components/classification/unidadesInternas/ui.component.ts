import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UiService } from 'src/app/common/services/ui/ui.service';
import { UnidadesAdmin, Ccosto } from 'src/app/common/interfaces/ui.interface';

@Component({
	selector: 'app-ui',
	templateUrl: './ui.component.html',
	styles: []
})
export class UiComponent implements OnInit {

	@Input() primary_keys_ui: any;
	@Output() out = new EventEmitter<any>();

	/* -- Variables globales -- */
	unidades: UnidadesAdmin[];
	ccostos: Ccosto[];
	data: any;

	constructor(
		private ui_service: UiService
	) {
		this.restartVariables();
	}

	restartVariables() {
		this.data = {
			id_unidad_adm: '',
			id_ccosto: '',
			id_clas_adm: '',
			id_cfg: '',
			nombre_cc: '',
			nombre_cfg: '',
			nombre_clas_adm: ''
		};
		this.ccostos = [];
	}

	ngOnInit() {
		this.ui_service.getUnidadesAdmin()
			.subscribe((data: any) => this.unidades = data);
			
		// if (this.primary_keys_ui[0] !== '0') {
		// 	this.getCcByUnidad(this.primary_keys_ui[0]);
		// 	this.getDataByCC(this.primary_keys_ui[1]);
		// } else {
			this.out.emit(this.data);
		// }
	}

	getCcByUnidad(id_unidad: string) {
		this.restartVariables();
		if (id_unidad !== '') {
			this.data.id_unidad_adm = id_unidad;
			this.ui_service.getCcByUnidad(id_unidad)
				.subscribe((data: any) => this.ccostos = data);
		}
	}

	getDataByCC(id_ccosto: string) {
		if (id_ccosto !== '') {
			this.data.id_ccosto = id_ccosto;
			this.ui_service.getDataByCC(id_ccosto)
				.subscribe((data_request: any) => {
					this.data.nombre_cc = this.ccostos.find(e => e.id == id_ccosto).nombre;
					this.data.id_clas_adm = data_request.id_ca;
					this.data.id_cfg = data_request.id_cfg;
					this.data.nombre_clas_adm = data_request.codigo_ca + ' - ' + data_request.nombre_ca;
					this.data.nombre_cfg = data_request.codigo_cfg + ' - ' + data_request.nombre_cfg;
				});
			this.out.emit(this.data);
		}
	}
}