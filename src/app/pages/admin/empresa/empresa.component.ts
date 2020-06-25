import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { Empresas } from 'src/app/common/interfaces/ui.interface';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';
import { Infos } from '../../../common/interfaces/ui.interface';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';

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

	ubicacion: any;
	banderaDigitos: boolean;
	banderaAsentamiento: boolean;

	constructor(
		private empresaService: EmpresaService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService,
		private ccostoService: CcostoService
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
			id_ubicacion: '',
			calle: '',
			num_exterior: '',
			dom_interior: '',
			num_interior: '',
			telefono: '',
			correo: '',
			rfc: '',
			curp: ''
		};
		this.ubicacion = {
			cp: '',
			estado: '',
			municipio: '',
			asentamientos: ''
		};
		this.banderaDigitos = false;
		this.banderaAsentamiento = true;

		this.activatedRoute.params.subscribe((data: any) => {
			this.id = data.id;
			if (this.id !== 'nuevo') {
				this.empresaService.getEmpresa(this.id).subscribe((obj1: any) => {
					// console.log('empresa', obj1.data);
					this.empresaService.getInfo(obj1.data[0].id_info_gene).subscribe((obj2: any) => {
						// console.log('info', obj2.data[0].id_ubicacion);
						this.createForma(obj1.data[0], obj2.data[0]);

						this.ccostoService.getUbicacion(obj2.data[0].id_ubicacion).subscribe((ubicacion: any) => {
							// console.log('ubicacion', ubicacion);
							this.ubicacion.cp = ubicacion.codigo_postal;
							this.getUbicacion();					
						});
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
					id_ubicacion: '',
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
		// console.log(admins);
	});

	  this.empresa = obj1;
	  this.info = obj2;

	}

	getUbicacion() {
		// console.log(this.ubicacion.cp);
		let numero = this.ubicacion.cp.toString();
		
		
		if(numero.length != 5){
			this.banderaDigitos = true;
		} else {
			this.banderaDigitos = false;			
			this.ccostoService.getUbicaciones(this.ubicacion.cp).subscribe((ubicacion: any) => {
					// console.log(ubicacion.data);	
					this.banderaAsentamiento = false;
					this.ubicacion = ubicacion.data;
					this.ubicacion.cp = numero;						
			}, error => {
				// console.log('error ubicacion', error.error);
				this.mensaje.danger(error.error);
			});
		}
	}

	guardar(f: NgForm) {
		let cp = this.ubicacion.cp.toString();
		if(cp.length != 5) {
			let mensaje = { 
				message: 'El codigo Postal debe constar de 5 digitos.',
				title: 'Error'
			}
			this.mensaje.danger(mensaje);
		} else {
			// console.log(this.empresa);
			if (f.valid) {
				this.empresaService.createInfo(this.info).subscribe((response1: any) => {
					if (response1.status === true) {
						// console.log('Informacion creada con exito.');
						this.empresaService.createEmpresa(this.empresa, response1.id)
						.subscribe((response: any) => {
							this.mensaje.success(response, 'panel-adm/empresas');
							// console.log(response);
						}, error => {
							this.mensaje.danger(error.error);
							// console.log(error);
						});
					} else {
						// console.log('Informacion editada con exito.');
					}
				}); 
			}
		}
	}
}
