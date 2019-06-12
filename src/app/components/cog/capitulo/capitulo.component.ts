import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CapituloService } from 'src/app/services/cog/capitulo.service';
import { Capitulos } from 'src/app/interfaces/cog.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-capitulo',
	templateUrl: './capitulo.component.html'
})
export class CapituloComponent {

	capitulo: Capitulos;

	constructor(
		private capituloService: CapituloService,
		private activitedRoute: ActivatedRoute
	) {
		this.capitulo = {
			id: '',
			codigo: '',
			nombre: '',
			status: true
		};

		this.activitedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				console.log(data.id);
				this.cargarCapitulos(data.id);
			}
		});
	}

	cargarCapitulos(id: string) {
		this.capituloService.getCapitulo(id)
			.subscribe((obj: Capitulos) => this.capitulo = obj);
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.capituloService.createUpdateCapitulo(this.capitulo)
				.subscribe((response: any) => {
					console.log(response);
				}, error => {
					console.log(error.error);
			});
		}
	}

}
