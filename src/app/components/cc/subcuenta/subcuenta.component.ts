import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubcuentaService } from 'src/app/services/cc/subcuenta.service';
import { Grupos, Generos, Rubros, Cuentas, Subcuentas } from '../../../interfaces/cc.interface';

@Component({
  selector: 'app-subcuenta',
  templateUrl: './subcuenta.component.html',
  styles: []
})
export class SubcuentaComponent implements OnInit{

	subcuenta: Subcuentas;
	cuentas: Cuentas;
	rubros: Rubros;
	grupos: Grupos;
	generos: Generos;

	constructor(
		private subcuentaService: SubcuentaService,
		private activitedRoute: ActivatedRoute
	) {
		this.subcuenta = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_genero: '',
			nombre_genero: '',
			id_grupo: '',
			nombre_grupo: '',
			id_rubro: '',
			nombre_rubro: '',
			id_cuenta: '',
			nombre_cuenta: '',
		};

		this.subcuentaService.getGeneros().subscribe((data: any) => {
			this.generos = data;
		});

		this.subcuentaService.getGrupos().subscribe((obj: Grupos) => {
			this.grupos = obj;
		});
		this.subcuentaService.getRubros().subscribe((obj: Rubros) => {
			this.rubros = obj;
		});
		this.subcuentaService.getCuentas().subscribe((obj: Cuentas) => {
			this.cuentas = obj;
		});



	}

	ngOnInit() {
		this.activitedRoute.params.subscribe(( data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarSubcuenta(data.id);
			}
		});
	}
	cargarSubcuenta(id: string) {
		this.subcuentaService.getSubcuenta(id).subscribe((obj: any) => {
			this.subcuenta = obj;
		});
	}


	guardar(f: NgForm) {
		if (f.valid) {
			this.subcuentaService.createUpdateSubcuenta(this.subcuenta)
				.subscribe((response: any) => {
					console.log(response);
				},
				error => {
					console.log(error.error);
				});
		}
	}

}
