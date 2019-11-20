import { Component } from '@angular/core';
import { Subfuente } from '../../../../../common/interfaces/cff.interface';
import { SubfuenteService } from '../../../../../common/services/cff/subfuente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subfuente',
  templateUrl: './subfuente.component.html',
  styles: []
})
export class SubfuenteComponent {
	id: string;
	subfuente: Subfuente = {
		id: '',
		id_fuente: null,
		codigo: '',
		nombre: '',
		status: true
	};
	fuentes: [];

  constructor(
		private subfuenteService: SubfuenteService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		// private toastrService: ToastrService
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.subfuenteService.getSubfuente(this.id)
					.subscribe((obj: Subfuente) => {
						this.createForma(obj);
					});
			} else {
				this.createForma({
					id: '',
					id_fuente: '',
					codigo: '',
					nombre: '',
					status: true
				});
			}
		});
  }

  createForma(obj: Subfuente) {
		this.subfuenteService.getFuentes().subscribe((fuentes: any) => {
			this.fuentes = fuentes;
		});
		this.subfuente = obj;
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.subfuenteService.createSubfuente(this.subfuente)
			.subscribe((response: any) => {
				if (response.mensaje === 'creada') {
					console.log('Sub Fuente creada con exito.');
				} else {
					console.log('Sub Fuente editada con exito.');
				}
			});

	}


}
