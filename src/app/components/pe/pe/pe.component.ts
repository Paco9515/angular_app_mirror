import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Proyectos, Fases } from 'src/app/interfaces/pe.interface';
import { PeService } from 'src/app/services/pe/pe.service';

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
		this.pe_service.get_proyectos()
			.subscribe((data: any) => {
				this.proyectos = data;
			});

		if (this.primary_keys_pe[0] !== 0) {
			console.log(this.getFasesByProyecto(this.primary_keys_pe[0])
			);
			console.log(this.getFases(this.primary_keys_pe[1]));

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
					this.fases = data;
				});
		}
	}

	getFases(id_fase) {
		this.data.id_fase = id_fase;
		this.pe.emit(this.data);
	}

}
