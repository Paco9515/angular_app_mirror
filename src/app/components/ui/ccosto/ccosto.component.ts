import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CcostoService } from "src/app/services/ui/ccosto.service";
import { Ccosto } from "src/app/interfaces/ui/ccosto";

@Component({
  selector: 'app-ccosto',
  templateUrl: './ccosto.component.html',
  styles: []
})
export class CcostoComponent implements OnInit {

  id: string;
	forma: FormGroup;
	// programa: Programas;

	constructor(
		private ccostoService: CcostoService,
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
				this.ccostoService.getCcosto(this.id)
					.subscribe((obj: Ccosto) => {
						this.createForma(obj);
						// this.programa = obj;

						//console.log(obj);

					});
			} else {
				this.createForma({
          id: '',
          id_unidad_adm: null,
          id_subfuncion: null,
          codigo: '',
          nombre: '',
          status:true
        });
				// this.programa = {nombre: '', status: true};
			}
		});
		// console.log('1');
	}

  ngOnInit() {
  }

  createForma(obj: Ccosto) {
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.ccostoService.createCcosto(this.forma.value)
		.subscribe((response: any) => {
			if (response.message === 'creada') {
				console.log('Centro de Costo creado con exito.');
			} else {
				console.log('Centro de Costo editado con exito.');
			}
		});

	}

}

