import { Component } from '@angular/core';
import { ProgramaService } from 'src/app/services/cp/programa.service';
import { ActivatedRoute } from '@angular/router';
import { Programas } from 'src/app/interfaces/cp.interface';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-programa',
	templateUrl: './programa.component.html'
})
export class ProgramaComponent {
	programa: Programas;

	constructor(
		private programaService: ProgramaService,
		private activatedRoute: ActivatedRoute,
	) {
		this.programa = {
			id: '',
			nombre: '',
			status: true
		};

		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarMedico(data.id);
			}
		});
	}

	cargarMedico(id: string) {
		this.programaService.getPrograma(id)
			.subscribe((obj: Programas) => this.programa = obj);
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.programaService.createUpdatePrograma(this.programa)
				.subscribe((response: any) => {
					console.log(response);
				}, error => {
					console.log(error.error);
				});
		}
	}
}
