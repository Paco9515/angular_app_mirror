import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Proyectos, Fases } from 'src/app/common/interfaces/pe.interface';
import { PeService } from 'src/app/common/services/pe/pe.service';

@Component({
  selector: 'app-pe',
  templateUrl: './pe.component.html'
})

export class PeComponent implements OnInit {
  	@Input() primary_keys_pe: any;
  	@Output() pe = new EventEmitter<any>();

	proyectos: Proyectos[];
   	fases: Fases[];

	data: any;
	fase =  true;

	constructor(
		private pe_service: PeService
	) {
		this.data = {
			id_proyecto: '',
			id_fase: ''
		};
		this.pe.emit(this.data);
	}

	ngOnInit() {

		if (this.primary_keys_pe[0] !== null && this.primary_keys_pe[0] !== 0 && this.primary_keys_pe[0] !== '') {
			this.getProyectosByCCostos(this.primary_keys_pe[0]);
			this.getFasesByProyecto(this.primary_keys_pe[1]);
			this.getFases(this.primary_keys_pe[2]);
			this.pe.emit(this.data);
		} else {

			this.pe_service.get_proyectos()
				.subscribe((data: any) => {
					this.proyectos = data;
				});
		}
	}

	getFasesByProyecto(id_proyecto) {
		this.data.id_fase = '';
		this.fases = [];
		this.fase = false;
		if (id_proyecto !== '') {
			this.data.id_proyecto = id_proyecto;
			this.pe_service.get_fases(id_proyecto)
			.subscribe((data: any) => {
				this.fases = data.data;
			});
		}
	}

	getProyectosByCCostos($id_ccosto) {
		this.pe_service.get_proyectos_ccostos($id_ccosto)
		.subscribe((data: any) => {
			this.proyectos = data.data;
		});
	}

	getFases(id_fase) {
		this.data.id_fase = id_fase;
		this.pe.emit(this.data);
	}

	// get_programatica($id_proyecto) {
	// 	if ($id_proyecto) {
	// 	this.pe_service.get_programatica($id_proyecto)
	// 		.subscribe((data: any) => {
	// 			this.programatica = data.data;
	// 		});
	// 	}
	// }

}
