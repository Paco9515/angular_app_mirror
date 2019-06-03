import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UnidadesAdminService } from "src/app/services/ui/unidadesAdmin.service";
import { UnidadesAdmin } from "src/app/interfaces/ui/unidadesAdmin";

@Component({
  selector: 'app-unidadAdmin',
  templateUrl: './unidadAdmin.component.html',
  styles: []
})
export class UnidadAdminComponent implements OnInit {

  id: string;
	forma: FormGroup;
	// programa: Programas;

	constructor(
		private unidadesService: UnidadesAdminService,
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
				this.unidadesService.getUnidadAdmin(this.id)
					.subscribe((obj: UnidadesAdmin) => {
						this.createForma(obj);
						// this.programa = obj;

						// console.log('3');

					});
			} else {
				this.createForma({
          id: '',
          id_empresa: '',
          codigo: '',
          nombre: '',
          desc: '',
          status:true
        });
				// this.programa = {nombre: '', status: true};
			}
		});
		// console.log('1');
	}

  ngOnInit() {
  }

  createForma(obj: UnidadesAdmin) {
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.unidadesService.createUnidad(this.forma.value)
		.subscribe((response: any) => {
			if (response.message === 'creada') {
				console.log('Empresa creada con exito.');
			} else {
				console.log('Empresa editada con exito.');
			}
		});

	}

}
