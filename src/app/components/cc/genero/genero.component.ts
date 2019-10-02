import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneroService } from 'src/app/services/cc/genero.service';
import { Generos } from 'src/app/interfaces/cc.interface';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-genero',
	templateUrl: './genero.component.html',
	styles: []
})
export class GeneroComponent {

  	genero: Generos;

	constructor(
		private generoService: GeneroService,
		private activitedRoute: ActivatedRoute
	) {
		this.genero = {
			id: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.activitedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarGenero(data.id);
			}
		});
	}

	cargarGenero(id: string) {
		this.generoService.getGenero(id)
			.subscribe((obj: any) => {
				this.genero = obj.data;
			},
			error => {
				console.log(error.error);
			});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.generoService.createUpdateGenero(this.genero)
				.subscribe((obj: any) => {
					console.log(obj);
				}, error => {
					console.log(error.error);
			});
		}
	}

}
