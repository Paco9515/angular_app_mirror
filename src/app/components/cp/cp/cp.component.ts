import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Programas, Subprograma } from 'src/app/interfaces/cp.interface';
import { CpService } from 'src/app/services/cp/cp.service';


@Component({
  selector: 'app-cp',
  templateUrl: './cp.component.html',
  styleUrls: []
})
export class CpComponent implements OnInit {
	@Input() primary_keys_cp: any;
	@Output() cp = new EventEmitter<any>();

	programas: Programas[];
	subprogramas: Subprograma[];

	data: any;
	subprograma =  true;

	constructor(
		private cp_service: CpService
	) {
		this.data = {
			id_programa: '',
			id_subprograma: ''
		};
		this.cp.emit(this.data);
	}

	ngOnInit() {
		this.cp_service.get_programas()
			.subscribe((data: any) => {
				this.programas = data;
			});

		if (this.primary_keys_cp[0] !== 0) {
			console.log(this.getSubprogramasByPrograma(this.primary_keys_cp[0]));
			console.log(this.getSubprogramas(this.primary_keys_cp[1]));

		}
	}

	getSubprogramasByPrograma(id_programa) {
		this.data.id_subprograma = '';
		this.subprogramas = [];
		this.subprograma = false;
		if (id_programa !== '') {
			this.data.id_programa = id_programa;
			this.cp_service.get_subprogramas(id_programa)
				.subscribe((data: any) => {
					this.subprogramas = data;
				});
		}
	}

	getSubprogramas(id_subprograma) {
		this.data.id_subprograma = id_subprograma;
		this.cp.emit(this.data);
	}

}
