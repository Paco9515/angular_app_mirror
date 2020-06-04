import { Component, OnInit } from '@angular/core';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { Ccosto } from 'src/app/common/interfaces/ui.interface';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { InterpolationConfig } from '@angular/compiler';


@Component({
  selector: 'app-ccostos',
  templateUrl: './ccostos.component.html',
  styles: []
})
export class CcostosComponent  {

  ccostos: Ccosto[];
  detalle: any;
  user: any;
  nivel: any;
  empresa: string;
  banderaAdmin: boolean;
  empresas: any;
  responsable: any = [];
  banderaResp: boolean = false;

  constructor(
		private ccosto_service: CcostoService,
		private empresaService: EmpresaService,
		private mensaje: MensajesService
	) {
		this.ccostos = [];
		this.detalle = {
			id: '',
			id_unidad_adm: '',
			nom_unidad: '',
			id_subfuncion: '',
			nom_subfuncion: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.nivel = null;    
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.user = user;
		this.nivel = user.id_nivel;
		this.empresa = user.id_empresa;

		this.inicio();
		
	}

	inicio() {
		this.ccosto_service.getResponsable().subscribe((centro: any) => {
			// console.log('responsable', centro);
			this.responsable = centro;
		});

		if(this.nivel == null || this.nivel == 1) {
			this.banderaResp = true;
		}


		if (this.nivel != null) {
				this.banderaAdmin = false;	
				this.getCcostosHijos();					
		} else {
			this.banderaAdmin = true;	
			this.empresaService.getEmpresas().subscribe((data: any) => {
				this.empresas = data;
				// console.log('empresas' ,this.empresas);
				this.getCcostos(this.empresas[0].id);
			});		
		} 
	}

    getCcostosHijos() {
		this.ccosto_service.getCentrosCostoHijos(this.user.id)
			.subscribe((data: any) => {
				this.ccostos = data.data;
				// console.log('hijos: ', data);
			});
	}

	getCcostos(id_empresa: string) {
		this.ccosto_service.getCcostos(id_empresa)
			.subscribe((data: any) => {
				this.ccostos = data;
				// console.log('Constructor: ', this.ccostos);
			});
	}

	info(ccosto: any) {
		this.detalle = ccosto;
		this.ccosto_service.getUnidad(ccosto.id_unidad_adm).subscribe((unidad: any) => {
			// console.log('unidad', unidad);
			this.detalle.nom_unidad = unidad.data.nombre;
		});
		this.ccosto_service.getSubfuncion(ccosto.id_subfuncion).subscribe((subfuncion: any) => {
			// console.log('subfuncion', subfuncion);
			this.detalle.nom_subfuncion = subfuncion.nombre;
		});
	}

	eliminarActivar(id: string, bandera: boolean) {
		// this.programas = (this.programas.filter(data => data.id === id));
		this.ccosto_service.eliminarCcosto(id, bandera)
			.subscribe((response: any) => {
				this.mensaje.success(response);
				this.getCcostos(this.empresas[0].id);
			});
	}

}