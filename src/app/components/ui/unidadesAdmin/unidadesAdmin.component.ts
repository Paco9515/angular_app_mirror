import { Component, OnInit } from '@angular/core';
import { UnidadesAdminService } from 'src/app/services/ui/unidadesAdmin.service';
import { UnidadesAdmin } from 'src/app/interfaces/ui.interface';

@Component({
  selector: 'app-unidadesAdmin',
  templateUrl: './unidadesAdmin.component.html',
  styles: []
})
export class UnidadesAdminComponent {

  unidades: UnidadesAdmin[];
  detalle: any;

  constructor(
		private unidad_service: UnidadesAdminService
	) {
		this.unidades = [];
		this.detalle = {
			id: '',
			id_empresa: '',
			nom_emp: '',
			codigo: '',
			nombre: '',
			desc: '',
			status: true
		};
		this.getUnidades();
	}

  getUnidades() {
		this.unidad_service.getUnidadesAdmin()
			.subscribe((data: any) => {
				this.unidades = data;
				// console.log('Constructor: ', data);
			});
	}

	info(unidad: any) {
		this.detalle = unidad;
		this.unidad_service.getEmpresa(unidad.id_empresa).subscribe((data: any) => {
			this.detalle.nom_emp = data[0].nom_comercial;
		});
	}

	eliminarActivar(id: string, bandera: boolean) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.unidad_service.activarEliminarUnidad(id, bandera)
			.subscribe((response: any) => {
				if (response.mensaje === 'eliminado') {
					console.log('Unidad Eliminada');
					this.getUnidades();
				} else {
					console.log('Unidad Activada');
					this.getUnidades();
				}
			});
	}

}
