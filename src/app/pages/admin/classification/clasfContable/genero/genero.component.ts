import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneroService } from 'src/app/common/services/cc/genero.service';
import { Generos } from 'src/app/common/interfaces/cc.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesService } from '../../../../../common/services/shared/mensajes.service';

@Component({
	selector: 'app-genero',
	templateUrl: './genero.component.html',
	styles: []
})
export class GeneroComponent {

  	genero: Generos;

	constructor(
		private generoService: GeneroService,
		private activitedRoute: ActivatedRoute,
		private mensaje: MensajesService
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
				this.mensaje.danger(error.error, 'panel-adm/generos');
			});
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.generoService.createUpdateGenero(this.genero)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}

}
