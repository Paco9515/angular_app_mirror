import { Component, OnInit } from '@angular/core';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { Ccosto } from 'src/app/common/interfaces/ui.interface';

@Component({
  selector: 'app-ccostos',
  templateUrl: './ccostos.component.html',
  styles: []
})
export class CcostosComponent  {

  ccostos: Ccosto[];
  detalle: any;

  constructor(
		private ccosto_service: CcostoService
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
		this.getCcostos();
	}

  getCcostos() {
		this.ccosto_service.getCcostos()
			.subscribe((data: any) => {
				this.ccostos = data;
				// console.log('Constructor: ', this.ccostos);
			});
	}

	info(ccosto: any) {
		this.detalle = ccosto;
		this.ccosto_service.getUnidad(ccosto.id_unidad_adm).subscribe((data: any) => {
			this.detalle.nom_unidad = data.data.nombre;
		});
		this.ccosto_service.getSubfuncion(ccosto.id_subfuncion).subscribe((data: any) => {
			this.detalle.nom_subfuncion = data.nombre;
		});
	}

	eliminarActivar(id: string, bandera: boolean) {
		// this.programas = (this.programas.filter(data => data.id === id));
		this.ccosto_service.eliminarCcosto(id, bandera)
			.subscribe((response: any) => {
				if (response.mensaje === 'eliminado') {
					console.log('Centro Eliminado');
					this.getCcostos();
				} else {
					console.log('Centro Activadao');
					this.getCcostos();
				}
			});
	}

}