import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CapituloService } from 'src/app/services/cog/capitulo.service';
import { Capitulos } from 'src/app/interfaces/cog/capitulos';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-capitulo',
	templateUrl: './capitulo.component.html'
})
export class CapituloComponent {

	id: string;
	forma: FormGroup;

	constructor(
		private capituloService: CapituloService,
		private router: Router,
		private activitedRoute: ActivatedRoute
	) {
		this.forma = new FormGroup({
			codigo: new FormControl('', Validators.required),
			nombre: new FormControl('', Validators.required)
		});

		this.activitedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.capituloService.getCapitulo(this.id)
					.subscribe((obj: Capitulos) => {
						this.createForma(obj);
					});
			} else {
				this.createForma({ id: '', codigo: '', nombre: '', status: true });
			}
		});
	}

	createForma(obj: Capitulos) {
		this.forma = new FormGroup({
			id: new FormControl(obj.id),
			codigo: new FormControl(obj.codigo, Validators.required),
			nombre: new FormControl(obj.nombre, Validators.required),
			status: new FormControl(obj.status),
		});
	}

	guardar() {
		this.capituloService.createCapitulo(this.forma.value)
			.subscribe((response: any) => {
				if (response.message === 'creada') {
					console.log('Capitulo creado con exito.');
				} else {
					console.log('Capitulo editado con exito.');
				}
			});

	}

}
