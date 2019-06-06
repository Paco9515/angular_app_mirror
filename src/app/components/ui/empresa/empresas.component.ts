import { Component, OnInit } from '@angular/core';
import { EmpresaService } from "src/app/services/ui/empresa.service";
import { Empresas } from "src/app/interfaces/ui.interface";

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent  {

  empresas: Empresas[];

  constructor(
		private empresa_service: EmpresaService
	) {
		this.empresas = [];
		this.getEmpresas();
	}

  getEmpresas() {
		this.empresa_service.getEmpresas()
			.subscribe((data: any) => {
				this.empresas = data;
				console.log('Constructor: ', this.empresas);
			});
	}

	eliminar(id: string, index: string) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.empresa_service.eliminarEmpresa(id)
			.subscribe((response: any) => {
				this.getEmpresas();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Eliminado con exito.');
	}

}
