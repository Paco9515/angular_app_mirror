import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
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
	empresa: Empresas;
	info: Infos;
	admins: [];

	constructor(
		private empresaService: EmpresaService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		// private toastrService: ToastrService
	) {
		this.empresa = {
			id: '',
			id_info_gene: '',
			id_tipo_empresa: '',
			id_clas_administrativa: '',
			nom_comercial: '',
			persona_moral: '',
			imss_sar: '',
			isste_foviste: '',
			reg_estatal : '',
			url_img : '',
			status: true,
		};
		this.info = {
			id: '',
			nombre: '',
			// id_info_gene:0,
			estado: '',
			municipio: '',
			localidad: '',
			cp: '',
			colonia: '',
			calle: '',
			num_exterior: '',
			dom_interior: '',
			num_interior: '',
			telefono: '',
			correo: '',
			rfc: '',
			curp: ''
		};

		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.empresaService.getEmpresa(this.id)
					.subscribe((obj1: Empresas) => {
						this.empresaService.getInfo(obj1[0].id_info_gene)
							.subscribe((obj2: Infos) => {
								this.createForma(obj1[0], obj2[0]);
							});
					});
			} else {
				this.createForma({
					id: '',
					id_info_gene: '',
					id_tipo_empresa: '',
					id_clas_administrativa: '',
					nom_comercial: '',
					persona_moral: '',
					imss_sar: '',
					isste_foviste: '',
					reg_estatal : '',
					url_img : '',
					status: true
				},
				{
					id: '',
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
					telefono: '',
					correo: '',
					rfc: '',
					curp: ''
				});
			}
		});
	}

  	createForma(obj1: Empresas, obj2: Infos) {
	  this.empresaService.getClasAdmis().subscribe((admins: any) => {
		this.admins = admins;
	});

	  this.empresa = obj1;
	  this.info = obj2;

	}

	guardar(f: NgForm) {
		console.log(this.empresa);
		if (f.valid) {
			this.empresaService.createInfo(this.info).subscribe((response1: any) => {
				if (response1.status === true) {
					console.log('Informacion creada con exito.');
					this.empresaService.createEmpresa(this.empresa, response1.id)
					.subscribe((response: any) => {
						console.log(response);
					}, error => {
						console.log(error.error);
					});
				} else {
					console.log('Informacion editada con exito.');
				}
			});
		}
	}
}
