import { Component } from '@angular/core';

@Component({
	selector: 'app-progress',
	templateUrl: './progress.component.html',
	styles: []
})
export class ProgressComponent {

	progreso_azul: number;
	progreso_verde: number;

	constructor() {
		this.progreso_azul = 50;
		this.progreso_verde = 20;
	}

}
