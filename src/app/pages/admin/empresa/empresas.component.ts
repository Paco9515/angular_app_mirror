import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';
import { Empresas } from 'src/app/common/interfaces/ui.interface';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent  {

  empresas: Empresas[];
  detalle: any;

  constructor(
		private empresa_service: EmpresaService
	) {
	this.empresas = [];
	this.detalle = {
		nombre: '',
		nom_comercial: '',
		estado: '',
		municipio: '',
		localidad: '',
		cp: null,
		colonia: '',
		calle: '',
		num_exterior: null,
		dom_interior: '',
		num_interior: '',
		telefono: null,
		correo: '',
		rfc: '',
		curp: '',
		id_tipo_empresa: null,
		nom_tipo_emp: '',
		id_clas_administrativa: null,
		nom_administrativa: '',
		persona_moral: null,
		imss_sar: '',
		isste_foviste: '',
		reg_estatal: '',
		url_img: '',
		status: true
	};
	this.getEmpresas();
	}

  getEmpresas() {
		this.empresa_service.getEmpresas()
			.subscribe((data: any) => {
				this.empresas = data;
				// console.log('Constructor: ', this.empresas);
			});
	}

	info(empresa: any) {
		this.detalle = empresa;
		this.empresa_service.getClasAdmin(empresa.id_clas_administrativa).subscribe((admin: any) => {
			this.detalle.nom_administrativa = admin.nombre;
			 console.log(this.detalle);
		});
		this.empresa_service.getTipo(empresa.id_tipo_empresa).subscribe((tipo: any) => {
			this.detalle.nom_tipo_emp = tipo.nombre;
			// console.log(this.detalle);
		});

	}

	eliminarActivar(id: string, bandera: boolean) {
		// this.programas = (this.programas.filter(data => data.id === id));
		this.empresa_service.activarEliminarEmpresa(id, bandera)
			.subscribe((response: any) => {
				if (response.mensaje === 'eliminado') {
					console.log('Empresa eliminada');
					this.getEmpresas();

				} else {
					console.log('Empresa activada');
					this.getEmpresas();
				}
			});
	}

}
