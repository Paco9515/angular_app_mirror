import { Component } from '@angular/core';
import { FaseService } from 'src/app/services/pe/fase.service';
import { ActivatedRoute } from '@angular/router';
import { Fases } from 'src/app/interfaces/pe.interface';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-fase',
	templateUrl: './fase.component.html'
})
export class FaseComponent {

	fase: Fases;
	proyectos: any[];

	constructor(
		private faseService: FaseService,
		private activatedRoute: ActivatedRoute,
	) {
		this.fase = {
			id: '',
			id_proyecto: '',
			codigo: '',
			nombre: '',
			descripcion: '',
			status: false
		};

		this.faseService.getProyectos().subscribe((data: any) => {
			this.proyectos = data;
		});

		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.getFases(data.id);
			}
		});
	}

	onChangeFase(id_proyecto) {
		this.fase.id_proyecto = id_proyecto;
	}

	getFases(id: string) {
		this.faseService.getFase(id)
			.subscribe((obj: Fases) => this.fase = obj);
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.faseService.createUpdateFase(this.fase)
				.subscribe((response: any) => {
					console.log(response);
				}, error => {
					console.log(error.error);
				});
		}
	}
}
