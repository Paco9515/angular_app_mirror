import { Component, OnInit } from '@angular/core';
import { ProgramaService } from 'src/app/services/cp/programa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Programas } from 'src/app/interfaces/cp/programas';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-programa',
	templateUrl: './programa.component.html'
})
export class ProgramaComponent implements OnInit {

	id: string;
	forma: FormGroup;
	// programa: Programas;

	constructor(
		private programaService: ProgramaService,
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
				this.programaService.getPrograma(this.id)
					.subscribe((obj: Programas) => {
						this.createForma(obj);
						// this.programa = obj;

						// console.log('3');

					});
			} else {
				this.createForma({id: '', nombre: '', status: true});
				// this.programa = {nombre: '', status: true};
			}
		});
		// console.log('1');
	}

	ngOnInit() {
		// this.forma = new FormGroup({
		// 	nombre: new FormControl(this.programa.nombre, Validators.required)
		// });
		// console.log('2');

	}

	createForma(obj: Programas) {
		this.forma = new FormGroup({
			id: new FormControl(obj.id),
			nombre: new FormControl(obj.nombre, Validators.required),
			status: new FormControl(obj.status),
		});
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.programaService.createPrograma(this.forma.value)
		.subscribe((response: any) => {
			if (response.message === 'creada') {
				console.log('Programa creado con exito.');
			} else {
				console.log('Programa editado con exito.');
			}
		});

	}

}
