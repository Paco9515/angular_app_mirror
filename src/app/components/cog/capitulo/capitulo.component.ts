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
			if (data.id !== 'nuevo') { // Verificar que la ruta solo acepte numeros /^[0-9]+$/;
				this.cargarCapitulos(data.id);
			}
		});
	}

	cargarCapitulos(id: string) {
		this.capituloService.getCapitulo(id)
		.subscribe((obj: any) => {
			this.capitulo = obj.data;
			// console.log(obj.data);
		},
		error => {
			// this.router.navigate(['**']);
			// console.log(error.error);
		});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.capituloService.createUpdateCapitulo(this.capitulo)
				.subscribe((response: any) => {
					// console.log(response);
				},
				error => {
					// console.log(error.error);
				});
		}
	}

}
