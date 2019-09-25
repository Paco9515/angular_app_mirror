import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tipo } from '../../../interfaces/cff.interface';
import { TipoService } from '../../../services/cff/tipo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styles: []
})
export class TipoComponent {
  id: string;
	tipo: Tipo = {
		id: '',
		id_subfuente: null,
		codigo: '',
		nombre: '',
		anio: '',
		status: true
	};
	subfuentes:[];
	fuentes=[];
	fuen: any = '';
	bandera:boolean=false;
	bandera2:boolean=true;
  
  constructor(
		private tipoService: TipoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		//private toastrService: ToastrService
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.bandera2=false;
				this.tipoService.getTipo(this.id)
					.subscribe((obj: Tipo) => {
						this.createForma(obj);
					});
			} else {
				this.tipoService.getFuentes().subscribe((centros: any) => {	
					this.fuentes=centros;		
				});	
				this.bandera=true;
				this.createForma({
					id: '',
					id_subfuente: null,
					codigo: '',
					nombre: '',
					anio: '',
					status: true
				});

				this.fuen = '';
				this.tipo.id_subfuente = '';
			}
		});
  }

	inicio(){		
		this.bandera2=false;
		this.tipoService.getSubs(this.fuen).subscribe((centros2: any) => {
			this.subfuentes=centros2;		
		});
		this.tipo.id_subfuente = '';
	}
  
	createForma(obj: Tipo) {
		if(this.id != 'nuevo'){
			var id_emp:number = 0;
			this.tipoService.getSub(obj.id_subfuente).subscribe((centros: any) => {
				id_emp = centros.id_fuente;		
				//console.log('centros de costo',centros);
				this.tipoService.getSubs(id_emp).subscribe((centros2: any) => {
					this.subfuentes=centros2;		
				});
			});
		}
		this.tipo = obj;
	}

	guardar(f: NgForm) {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');
		if (f.valid) {
			this.tipoService.createTipo(this.tipo)
				.subscribe((response: any) => {
					if (response.message === 'creada') {
						console.log('Tipo creado con exito.');
					} else {
						console.log('Tipo editado con exito.');
					}
				});
		}

	}


}
