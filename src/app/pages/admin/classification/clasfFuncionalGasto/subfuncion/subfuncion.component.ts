import { Component } from '@angular/core';
import { Subfunciones } from '../../../../../common/interfaces/cfg.interface';
import { SubfuncionService } from '../../../../../common/services/cfg/subfuncion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subfuncion',
  templateUrl: './subfuncion.component.html',
  styles: []
})
export class SubfuncionComponent {
  id: string;
	subfuncion: Subfunciones = {
		id: '',
		id_funcion: null,
		codigo: '',
		nombre: '',
		status: true
	};
	funciones: [];
	finalidades: [];
	fina: any;
	bandera = false;
	bandera2 = true;

  constructor(
		private subfuncionService: SubfuncionService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		// private toastrService: ToastrService
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.bandera2 = false;
				this.subfuncionService.getSubfuncion(this.id)
					.subscribe((obj: Subfunciones) => {
						this.createForma(obj);
					});
			} else {
				this.subfuncionService.getFinalidades().subscribe((centros: any) => {
					this.finalidades = centros;
				});
				this.bandera = true;
				this.createForma({
					id: '',
					id_funcion: null,
					codigo: '',
					nombre: '',
					status: true
				});

				this.fina = '';
				this.subfuncion.id_funcion = '';
			}
		});
  }

  	inicio() {
		this.bandera2 = false;
		this.subfuncionService.getFunciones(this.fina).subscribe((centros2: any) => {
			this.funciones = centros2;
		});
		this.subfuncion.id_funcion = '';
	}

  	createForma(obj: Subfunciones) {
		if (this.id !== 'nuevo') {
			let id_emp = 0;
			this.subfuncionService.getFuncion(obj.id_funcion).subscribe((centros: any) => {
				id_emp = centros.id_finalidad;
				// console.log('centros de costo',centros);
				this.subfuncionService.getFunciones(id_emp).subscribe((centros2: any) => {
					this.funciones = centros2;
				});
			});
		}

		this.subfuncion = obj;
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.subfuncionService.createSubfuncion(this.subfuncion)
			.subscribe((response: any) => {
				if (response.mensaje === 'creada') {
					console.log('Funcion creada con exito.');
				} else {
					console.log('Funcion editada con exito.');
				}
			});

	}


}
