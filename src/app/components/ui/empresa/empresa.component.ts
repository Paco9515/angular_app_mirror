import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Empresas } from 'src/app/interfaces/ui.interface';
import { EmpresaService } from 'src/app/services/ui/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent  {

  	id: string;
	empresa: Empresas = {
		id: '',
		id_tipo_empresa: null,
		id_clas_administrativa: null,
		nombre: '',
		nom_comercial: '',
		persona_moral: null,
		imss_sar:'',
		isste_foviste:'',
		reg_estatal : '',
		url_image :'',
		status: true,
		//id_info_gene:0,
		estado:'',
		municipio: '',
		localidad: '',
		cp:null,
		colonia:'',
		calle:'',
		num_exterior:null,
		dom_interior:'',
		num_interior:'',
		telefono:null,
		correo:'',
		rfc:'',
		curp: ''
	};
	admins: [];
	// programa: Programas;

	constructor(
		private empresaService: EmpresaService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		//private toastrService: ToastrService
	) {

		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			//console.log(data.id);
			if (this.id !== 'nuevo') {
				this.empresaService.getEmpresa(this.id)
					.subscribe((obj: Empresas) => {
						this.createForma(obj[0]);
            			//console.log('objeto get empresa',obj[0]);
					});
			} else {
				this.createForma({
					id: '',
					id_tipo_empresa: 1,
					id_clas_administrativa: 1,
					nombre: '',
					nom_comercial: '',
					persona_moral: 0,
					imss_sar:'',
					isste_foviste:'',
					reg_estatal : '',
					url_image :'',
					status: true,
					id_info:'',
					estado:'',
					municipio: '',
					localidad: '',
					cp:null,
					colonia:'',
					calle:'',
					num_exterior:null,
					dom_interior:'',
					num_interior:'',
					telefono:null,
					correo:'',
					rfc:'',
					curp: ''
					        });
				// this.programa = {nombre: '', status: true};
			}
		});
		// console.log('1');
	}

  createForma(obj: Empresas) {
	  this.empresaService.getClasAdmis().subscribe((admins: any) => {
		this.admins = admins;
		//console.log(this.admins);
	});
		this.empresa = obj;
	}

	guardar() {
		//console.log('se trato de guardar', forma.value);
		//console.log('empresa', this.empresa);
	  	this.empresaService.createEmpresa(this.empresa)
		  .subscribe((response: any) => {
			//console.log(response.message);
			if (response.mensaje === 'creado') {
				console.log('Empresa creada con exito.');
			} else {
				console.log('Empresa editada con exito.');
			}
		})    ;

		//console.log(rr);


	}

}
