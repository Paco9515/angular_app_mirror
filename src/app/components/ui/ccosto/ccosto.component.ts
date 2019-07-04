import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CcostoService } from "src/app/services/ui/ccosto.service";
import { Ccosto } from "src/app/interfaces/ui.interface";

@Component({
  selector: 'app-ccosto',
  templateUrl: './ccosto.component.html',
  styles: []
})
export class CcostoComponent {

  id: string;
	ccostos:Ccosto = {
		id:'',
	    id_unidad_adm:1,
	    id_subfuncion:1,
	    codigo:'',
	    nombre:'',
	    status:true
		}
		unidades:[];
		subs:[];
		empresas=[];
		emp;
		bandera:boolean=false;
		bandera2:boolean=true;
	
	constructor(
		private ccostoService: CcostoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		//private toastrService: ToastrService
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.bandera2=false;
				this.ccostoService.getCcosto(this.id)
					.subscribe((obj: Ccosto) => {
						this.createForma(obj);
						// this.programa = obj;

						//console.log(obj);

					});
			} else {
				this.ccostoService.getEmpresas().subscribe((centros: any) => {	
					this.empresas=centros;		
				});	
				this.bandera=true;			
				this.createForma({
		          id: '',
		          id_unidad_adm: 1,
		          id_subfuncion: 1,
		          codigo: '',
		          nombre: '',
		          status:true
		        });
				// this.programa = {nombre: '', status: true};
			}
		});
		// console.log('1');
	}

	inicio(){		
		this.bandera2=false;
		this.ccostoService.getUnidades(this.emp).subscribe((centros2: any) => {
			this.unidades=centros2;		
		});	

		
				
	}

  createForma(obj: Ccosto) {
	if(this.id != 'nuevo'){
		var id_emp:number = 0;
		this.ccostoService.getUnidad(obj.id_unidad_adm).subscribe((centros: any) => {
			id_emp = centros.id_empresa;		
			//console.log('centros de costo',centros);
			this.ccostoService.getUnidades(id_emp).subscribe((centros2: any) => {
				this.unidades=centros2;		
			});
		});
	}
	this.ccostoService.getSubfunciones().subscribe((subs: any) => {
		this.subs = subs;
		
	});
		this.ccostos = obj;
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.ccostoService.createCcosto(this.ccostos)
		.subscribe((response: any) => {
			if (response.message === 'creada') {
				console.log('Centro de Costo creado con exito.');
			} else {
				console.log('Centro de Costo editado con exito.');
			}
		});

	}

}

