import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FinalidadService } from '../../../services/cfg/finalidad.service';
import { Finalidad } from '../../../interfaces/cfg.interface';

@Component({
  selector: 'app-finalidad',
  templateUrl: './finalidad.component.html',
  styles: []
})
export class FinalidadComponent {

  	id: string;
	finalidad:Finalidad = {
		id: '',
		codigo: '',
		nombre: '',
		status:true
	};
	// programa: Programas;

	constructor(
		private finalidadService: FinalidadService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		//private toastrService: ToastrService
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.finalidadService.getFinalidad(this.id)
					.subscribe((obj: Finalidad) => {
						this.createForma(obj);
						// this.programa = obj;

						//console.log(obj);

					});
			} else {
				this.createForma({
          id: '',
          codigo: '',
          nombre: '',
          status:true  
        });
				// this.programa = {nombre: '', status: true};
			}
		});
    // console.log('1');
  }

  createForma(obj: Finalidad) {
	  this.finalidad = obj;
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');
		//console.log(this.finalidad);
		this.finalidadService.createFinalidad(this.finalidad)
		.subscribe((response: any) => {
			if (response.message === 'creada') {
				console.log('Finalidad creada con exito.');
			} else {
				console.log('Finalidad editada con exito.');
			}
		});

	}

}
