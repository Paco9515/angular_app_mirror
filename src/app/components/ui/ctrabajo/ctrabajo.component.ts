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
	unidades = [];
	unidadAdm;
	bandera: boolean = false;
	bandera2: boolean = true;

	constructor(
		private ctrabajoService: CtrabajoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		// private toastrService: ToastrService
	) {
		this.activatedRoute.params.subscribe((data: any) => {
		this.id = data.id;
		if (this.id !== 'nuevo') {
			this.bandera2=false;
			this.ctrabajoService.getCtrabajo(this.id)
				.subscribe((obj: Ctrabajo) => {
					this.createForma(obj);
				});
		} else {
			this.bandera=true;
			this.ctrabajoService.getUnidades().subscribe((obj: any) => {
					this.unidades = obj;
					// console.log(this.unidades);
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
					status:true,
				});	
			this.unidadAdm = '';
			this.ctrabajo.id_centro_costo = '';	
			}
		});
	}

	inicio(){		
		this.bandera2=false;
		this.ctrabajoService.getCentros(this.unidadAdm).subscribe((centros: any) => {	
			this.centros=centros;
		});
		
		this.ctrabajo.id_centro_costo = '';	
	}
	
	createForma(obj: Ctrabajo) {
		if(this.id != 'nuevo'){
			var id_emp:number = 0;
			this.ctrabajoService.getCentro(obj.id_centro_costo).subscribe((centros: any) => {
				id_emp = centros.id_unidad_adm;		
				console.log('centros de costo',centros);
				this.ctrabajoService.getCentros(id_emp).subscribe((centros2: any) => {
					this.centros=centros2;		
				});
			});
		}		
		this.ctrabajo = obj;
		
	}
	
	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');
		//console.log('info ctrabajo',this.ctrabajo);
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

