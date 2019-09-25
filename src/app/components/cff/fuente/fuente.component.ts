import { Component } from '@angular/core';
import { FuenteService } from '../../../services/cff/fuente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Fuente } from '../../../interfaces/cff.interface';

@Component({
  selector: 'app-fuente',
  templateUrl: './fuente.component.html',
  styles: []
})
export class FuenteComponent {
    id: string;
	fuente: Fuente = {
		id: '',
		codigo: '',
		nombre: '',
		status: true
	};
  
  constructor(
		private fuenteService: FuenteService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		//private toastrService: ToastrService
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.fuenteService.getFuente(this.id)
					.subscribe((obj: Fuente) => {
						this.createForma(obj);
					});
			} else {
				this.createForma({
					id: '',
					codigo: '',
					nombre: '',
					status: true
				});
			}
		});
  }
  
  createForma(obj: Fuente) {
		this.fuente = obj;
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.fuenteService.createFuente(this.fuente)
			.subscribe((response: any) => {
				if (response.message === 'creada') {
					console.log('Fuente creada con exito.');
				} else {
					console.log('Fuente editada con exito.');
				}
			});

	}


}
