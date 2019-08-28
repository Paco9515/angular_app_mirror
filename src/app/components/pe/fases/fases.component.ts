import { Component } from '@angular/core';
import { FaseService } from 'src/app/services/pe/fase.service';
import { Fases } from 'src/app/interfaces/pe.interface';

@Component({
	selector: 'app-fases',
	templateUrl: './fases.component.html'
})
export class FasesComponent {

	fases: Fases[];

	constructor(
		private fase_service: FaseService
	) {
		this.fases = [];
		this.getFases();
	}

	getFases() {
		this.fase_service.getFases()
			.subscribe((data: any) => this.fases = data);
	}

	eliminarActivar(id: string, type: boolean) {
		this.fase_service.activarEliminarFase(id, type)
			.subscribe((response: any) => {
				console.log(response.message);
				this.getFases();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
	}
}
