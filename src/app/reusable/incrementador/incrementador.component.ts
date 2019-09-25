import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-incrementador',
	templateUrl: './incrementador.component.html',
	styleUrls: []
})
export class IncrementadorComponent {

	@ViewChild('htmlprogreso') htmlprogreso: ElementRef;
	@Input() progreso: number;
	@Input() legend: string;

	@Output() cambioValor: EventEmitter<number> = new EventEmitter();

	constructor() {
		this.legend = 'Leyenda';
		this.progreso = 50;
	}

	onChanges(v: number) {
		// const inputhtml: any = document.getElementsByName('progreso')[0];

		if (v >= 100) {
			this.progreso = 100;
		} else if (v <= 0) {
			this.progreso = 0;
		}

		this.htmlprogreso.nativeElement.value = this.progreso;

		this.cambioValor.emit(this.progreso);
	}

	cambiar(v: number) {
		if (this.progreso === 100 && v > 0) {
			return;
		} else if (this.progreso === 0 && v < 0) {
			return;
		}
		this.progreso += v;
		this.cambioValor.emit(this.progreso);
	}

}
