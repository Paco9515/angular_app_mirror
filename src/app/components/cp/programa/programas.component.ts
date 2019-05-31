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
			.subscribe((data: any) => {
				this.programas = data;
				// console.log('Constructor: ', this.programas);
			});
	}

	eliminar(id: string, index: string) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.programa_service.eliminarPrograma(id)
			.subscribe((response: any) => {
				this.getProgramas();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Eliminado con exito.');
	}

	activar(programa: Programas, index: string) {

		this.programa_service.activarPrograma({
			id: programa.id,
			nombre: programa.nombre,
			status: !programa.status
		}).subscribe((response: any) => {
				// console.log(response.message);
				this.getProgramas();
				// this.programas = this.programas.filter(student => student.id !== id);
				// console.log('Funcion: ', this.programas);
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Activado con exito.');
	}

}
