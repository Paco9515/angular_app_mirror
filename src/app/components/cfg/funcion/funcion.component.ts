import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { FuncionService } from '../../../services/cfg/funcion.service';
import { Funciones } from '../../../interfaces/cfg.interface';

@Component({
	selector: 'app-funcion',
	templateUrl: './funcion.component.html',
	styles: []
})
export class FuncionComponent {

	id: string;
	funcion: Funciones = {
		id: '',
		id_finalidad: null,
		codigo: '',
		nombre: '',
		status: true
	};
	finalidades:[];

	constructor(
		private funcionService: FuncionService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		//private toastrService: ToastrService
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.funcionService.getFuncion(this.id)
					.subscribe((obj: Funciones) => {
						this.createForma(obj);
					});
			} else {
				this.createForma({
					id: '',
					id_finalidad: null,
					codigo: '',
					nombre: '',
					status: true
				});
			}
		});
	}


	createForma(obj: Funciones) {
		this.funcionService.getFinalidades().subscribe((finalidades: any) => {
			this.finalidades = finalidades;
		});
		this.funcion = obj;
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.funcionService.createFuncion(this.funcion)
			.subscribe((response: any) => {
				if (response.mensaje === 'creada') {
					console.log('Funcion creada con exito.');
				} else {
					console.log('Funcion editada con exito.');
				}
			});

	}

}
