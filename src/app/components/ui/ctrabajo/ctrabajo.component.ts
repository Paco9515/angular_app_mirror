import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CtrabajoService } from "src/app/services/ui/ctrabajo.service";
import { Ctrabajo } from "src/app/interfaces/ui/ctrabajo";

@Component({
  selector: 'app-ctrabajo',
  templateUrl: './ctrabajo.component.html',
  styles: []
})
export class CtrabajoComponent implements OnInit {

  id: string;
	forma: FormGroup;
	// programa: Programas;

	constructor(
		private ctrabajoService: CtrabajoService,
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
				this.ctrabajoService.getCtrabajo(this.id)
					.subscribe((obj: Ctrabajo) => {
						this.createForma(obj);
						// this.programa = obj;

						//console.log(obj);

					});
			} else {
				this.createForma({
          id: 'true',
          id_centro_costo: null,
          codigo: 'true',
          nombre: 'true',
          estado: 'true',
          municipio: 'true',
          localidad: 'true',
          cp: 'true',
          colonia: 'true',
          calle: 'true',
          num_exterior: 'true',
          dom_interior: 'true',
          num_interior: 'true',
          status:true,
        });
				// this.programa = {nombre: '', status: true};
			}
		});
		// console.log('1');
  }
  ngOnInit() {
  }

  createForma(obj: Ctrabajo) {
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.ctrabajoService.createCtrabajo(this.forma.value)
		.subscribe((response: any) => {
			if (response.message === 'creada') {
				console.log('Centro de Trabajo creado con exito.');
			} else {
				console.log('Centro de Trabajo editado con exito.');
        }
		  });

  	}

  }

