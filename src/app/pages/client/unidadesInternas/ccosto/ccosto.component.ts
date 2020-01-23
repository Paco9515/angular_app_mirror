import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { Ccosto } from 'src/app/common/interfaces/ui.interface';

@Component({
  selector: 'app-ccosto',
  templateUrl: './ccosto.component.html',
  styles: []
})
export class CcostoComponent {

  	id: string;
	ccostos: Ccosto;
	unidades: [];
	subs: [];
	empresas: [];
	niveles: [];
	costos: [];
	emp: any;
	bandera: boolean;
	// bandera 2 es para bloquear la unidad
	bandera2: boolean;

	constructor(
		private ccostoService: CcostoService,
		private activatedRoute: ActivatedRoute,
	) {
		this.id = '';
		this.ccostos = {
			id: '',
			id_unidad_adm: '',
			id_subfuncion: '',
			id_nivel: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.unidades = [];
		this.subs = [];
		this.empresas = [];
		this.niveles = [];
		this.costos = [];
		this.emp = '';
		this.bandera = false;
		this.bandera2 = true;

		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.bandera2 = false;
				this.ccostoService.getCcosto(this.id)
					.subscribe((obj: Ccosto) => {
						this.createForma(obj);
						// console.log(obj);
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
		this.ccostoService.getNiveles().subscribe((niveles: any) => {
			this.niveles = niveles;
		});
		this.ccostoService.getUltimoCentro().subscribe((ult_centro: any) => {
			this.ccostos.codigo = ult_centro.id + 1;
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
		if (this.id !== 'nuevo') {
			// console.log(obj.id);
			this.ccostoService.getUnidades(obj.id).subscribe((centros2: any) => {
				this.unidades = centros2;
			});
		}
		this.ccostoService.getSubfunciones().subscribe((subs: any) => {
			this.subs = subs;
		});
		this.ccostos = obj;

	}

	getDireccion(codigo_postal) {
		console.log(codigo_postal);
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.ccostoService.createCcosto(this.ccostos)
			.subscribe((response: any) => {
				console.log(response);
			}, error => {
				console.log(error.error);
			});
		}
	}

}

