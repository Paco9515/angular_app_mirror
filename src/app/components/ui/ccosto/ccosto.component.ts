import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CcostoService } from 'src/app/services/ui/ccosto.service';
import { Ccosto } from 'src/app/interfaces/ui.interface';

@Component({
  selector: 'app-ccosto',
  templateUrl: './ccosto.component.html',
  styles: []
})
export class CcostoComponent {

  	id: string;
	ccostos: Ccosto = {
		id: '',
		id_unidad_adm: '',
		id_subfuncion: '',
		id_nivel: '',
		codigo: '',
		nombre: '',
		status: true
	};
	unidades: [];
	subs: [];
	empresas = [];
	niveles = [];
	costos = [];
	emp;
	bandera = false;
	bandera2 = true;

	constructor(
		private ccostoService: CcostoService,
		private activatedRoute: ActivatedRoute,
	) {
		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.bandera2 = false;
				this.ccostoService.getCcosto(this.id)
					.subscribe((obj: Ccosto) => {
						this.createForma(obj);
						console.log(obj);
					});
			} else {
				this.ccostoService.getEmpresas().subscribe((empresas: any) => {
					this.empresas = empresas;
				});
				this.bandera = true;
				this.createForma({
					id: '',
					id_unidad_adm: '',
					id_subfuncion: '',
					id_nivel: '',
					codigo: '',
					nombre: '',
					status: true
				});

				this.emp = '';
				this.ccostos.id_unidad_adm = '';
				this.ccostos.id_subfuncion = '';
			}
		});
	}

	inicio() {
		this.bandera2 = false;
		this.ccostoService.getUnidades(this.emp).subscribe((centros2: any) => {
			this.unidades = centros2;
		});


		this.ccostos.id_unidad_adm = '';
		this.ccostos.id_subfuncion = '';


	}

  createForma(obj: Ccosto) {

	this.ccostoService.getNiveles().subscribe((niveles: any) => {
		this.niveles = niveles;
	});
	this.ccostoService.getUltimoCentro().subscribe((ult_centro: any) => {
		this.ccostos.codigo = ult_centro.id + 1;
	});

	if (this.id !== 'nuevo') {
		let id_emp = 0;
		this.ccostoService.getUnidad(obj.id_unidad_adm).subscribe((centros: any) => {
			id_emp = centros.id_empresa;
			// console.log('centros de costo',centros);
			this.ccostoService.getUnidades(id_emp).subscribe((centros2: any) => {
				this.unidades = centros2;
			});
		});
	}
	this.ccostoService.getSubfunciones().subscribe((subs: any) => {
		this.subs = subs;

	});
	this.ccostos = obj;

}

	guardar(f: NgForm) {
		if (f.valid) {
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

}

