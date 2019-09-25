import { Component } from '@angular/core';
import { ProgramaService } from 'src/app/services/cp/programa.service';
import { Programas } from 'src/app/interfaces/cp.interface';

@Component({
	selector: 'app-programas',
	templateUrl: './programas.component.html'
})
export class ProgramasComponent {

	programas: Programas[];

	constructor(
		private programa_service: ProgramaService
	) {
		this.programas = [];
		this.getProgramas();
	}

	getProgramas() {
		this.programa_service.getProgramas()
			.subscribe((data: any) => this.programas = data);
	}

	eliminarActivar(id: string, type: boolean) {
		this.programa_service.activarEliminarPrograma(id, type)
			.subscribe((response: any) => {
				console.log(response.message);
				this.getProgramas();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
	}
}
