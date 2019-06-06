import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FuncionService } from '../../../services/cfg/funcion.service';
import { Funciones } from '../../../interfaces/cfg/funcion';

@Component({
	selector: 'app-funcion',
	templateUrl: './funcion.component.html',
	styles: []
})
export class FuncionComponent implements OnInit {

	id: string;
	forma: FormGroup;
	// programa: Programas;

	constructor(
		private funcionService: FuncionService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private toastrService: ToastrService
	) {
		this.forma = new FormGroup({
			nombre: new FormControl('', Validators.required)
		});
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.funcionService.getFuncion(this.id)
					.subscribe((obj: Funciones) => {
						this.createForma(obj);
						// this.programa = obj;

						//console.log(obj);

					});
			} else {
				this.createForma({
					id: '',
					id_finaliddad: null,
					codigo: '',
					nombre: '',
					status: true
				});
				// this.programa = {nombre: '', status: true};
			}
		});
		// console.log('1');
	}

	ngOnInit() {
	}

	createForma(obj: Funciones) {
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.funcionService.createFuncion(this.forma.value)
			.subscribe((response: any) => {
				if (response.message === 'creada') {
					console.log('Funcion creada con exito.');
				} else {
					console.log('Funcion editada con exito.');
				}
			});

	}

}
