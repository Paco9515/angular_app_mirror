import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { CtrabajoService } from 'src/app/services/ui/ctrabajo.service';
import { Ctrabajo } from 'src/app/interfaces/ui.interface';

@Component({
  selector: 'app-ctrabajo',
  templateUrl: './ctrabajo.component.html',
  styles: []
})
export class CtrabajoComponent {

	id: string;
	ctrabajo: Ctrabajo;
	centros: [];
	unidades: [];
	unidadAdm: any;
	bandera: boolean;
	bandera2: boolean;

	constructor(
		private ctrabajoService: CtrabajoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		// private toastrService: ToastrService
	) {
		this.id = '';
		this.ctrabajo = {
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
			status: true,
		};
		this.centros = [];
		this.unidades = [];
		this.unidadAdm = '';
		this.bandera = false;
		this.bandera2 = true;

		this.activatedRoute.params.subscribe((data: any) => {
		this.id = data.id;
		if (this.id !== 'nuevo') {
			this.bandera2 = false;
			this.ctrabajoService.getCtrabajo(this.id)
				.subscribe((obj: Ctrabajo) => {
					this.createForma(obj);
				});
		} else {
			this.bandera = true;
			this.ctrabajoService.getUnidades().subscribe((obj: any) => {
					this.unidades = obj;
				});

			this.createForma({
					id: '',
					id_centro_costo: '',
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
					status: true,
				});
			this.unidadAdm = '';
			this.ctrabajo.id_centro_costo = '';
			}
		});
	}

	inicio() {
		this.bandera2 = false;
		this.ctrabajoService.getCentros(this.unidadAdm).subscribe((centros: any) => {
			this.centros = centros;
		});
		this.ctrabajo.id_centro_costo = '';
	}

	createForma(obj: Ctrabajo) {
		if (this.id !== 'nuevo') {
			this.ctrabajoService.getCentros(obj.id).subscribe((centros2: any) => {
				this.centros = centros2;
			});
		}
		this.ctrabajo = obj;
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.ctrabajoService.createCtrabajo(this.ctrabajo)
			.subscribe((response: any) => {
				console.log(response);
			}, error => {
				console.log(error.error);
			});
		}

	}

	}

