import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Empresas } from 'src/app/interfaces/ui.interface';
import { EmpresaService } from 'src/app/services/ui/empresa.service';
import { Infos } from '../../../interfaces/ui.interface';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent  {

  	id: string;
	empresa: Empresas = {
		id: '',
		id_info_gene:null,
		id_tipo_empresa: null,
		id_clas_administrativa: null,		
		nom_comercial: '',
		persona_moral: null,
		imss_sar:'',
		isste_foviste:'',
		reg_estatal : '',
		url_img :'',
		status: true,		
	};
	info:Infos={
		id: '',
		nombre: '',
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
	}
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
					.subscribe((obj1: Empresas) => {
						//console.log('id info',obj1[0].id_info_gene);
						this.empresaService.getInfo(obj1[0].id_info_gene)
							.subscribe((obj2: Infos) => {
								this.createForma(obj1[0],obj2[0]);
		            			//console.log('objeto get empresa',obj[0]);
							});						
            			//console.log('objeto get empresa',obj[0]);
					});
				
			} else {
				this.createForma({
					id: '',
					id_info_gene:null,
					id_tipo_empresa: 1,
					id_clas_administrativa: 1,
					nom_comercial: '',
					persona_moral: 0,
					imss_sar:'',
					isste_foviste:'',
					reg_estatal : '',
					url_img :'',
					status: true
				},
				{
					id: '',
					nombre: '',
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

  createForma(obj1: Empresas,obj2: Infos) {
	  this.empresaService.getClasAdmis().subscribe((admins: any) => {
		this.admins = admins;
		//console.log(this.admins);
	});
		this.empresa = obj1;
		this.info = obj2;

		//console.log('Empresa',this.empresa);
		//console.log('Info',this.info);

	}

	guardar() {	  	

		 this.empresaService.createInfo(this.info)
		    .subscribe((response: any) => {
			//console.log(response.message);
			if (response.mensaje === 'creado') {
				console.log('Informacion creada con exito.');
				//console.log('id',response.id);
				this.empresaService.createEmpresa(this.empresa,response.id)
				    .subscribe((response: any) => {
					//console.log(response.message);
					if (response.mensaje === 'creado') {
						console.log('Empresa creada con exito.');
					} else {
						console.log('Empresa editada con exito.');
					}
				});
			} else {
				console.log('Informacion editada con exito.');
			}
		});

		


	}

}
