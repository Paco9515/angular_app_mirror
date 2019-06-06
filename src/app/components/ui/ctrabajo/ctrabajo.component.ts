import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CtrabajoService } from "src/app/services/ui/ctrabajo.service";
import { Ctrabajo } from "src/app/interfaces/ui.interface"

@Component({
  selector: 'app-ctrabajo',
  templateUrl: './ctrabajo.component.html',
  styles: []
})
export class CtrabajoComponent {

	id: string;
	ctrabajo: Ctrabajo = {
		id: '',
		id_centro_costo: null,
		codigo: '',
		nombre: '',
		estado: '',
		municipio: '',
		localidad: '',
		cp: '',
		colonia: '',
		calle: '',
		num_exterior: '',
		dom_interior: '',
		num_interior: '',
		status:true,
	};
	centros = [];
	
	constructor(
		private ctrabajoService: CtrabajoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		//private toastrService: ToastrService
	) {
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
				id: '',
				id_centro_costo: 1,
				codigo: '',
				nombre: '',
				estado: '',
				municipio: '',
				localidad: '',
				cp: '',
				colonia: '',
				calle: '',
				num_exterior: '',
				dom_interior: '',
				num_interior: '',
				status:true,
			});
				// this.programa = {nombre: '', status: true};
			}
		});
		// console.log('1');
	}

	createForma(obj: Ctrabajo) {

		this.ctrabajoService.getCentros().subscribe((centros: any) => {
			this.centros = centros;			
		});
		this.ctrabajo = obj;
	}
	
	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');
	
		this.ctrabajoService.createCtrabajo(this.ctrabajo)
		.subscribe((response: any) => {
			if (response.mensaje === 'creada') {
				console.log('Centro de Trabajo creado con exito.');
			} else {
				console.log('Centro de Trabajo editado con exito.');
		}
			});
	
	}
	
	}

