import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../../interfaces/cff.interface';
import { TipoService } from '../../../services/cff/tipo.service';

@Component({
	selector: 'app-tipos',
	templateUrl: './tipos.component.html',
	styles: []
})
export class TiposComponent {

	tipos: Tipo[];
	detalle: any;

	constructor(
		private tipos_service: TipoService
	) {
		this.tipos = [];
		this.detalle = {
			id: '',
			id_subfuente: '',
			nom_subfuente: '',
			codigo: '',
			nombre: '',
			ani: '',
			status: true
		};
		this.getTipos();
	}

	getTipos() {
		this.tipos_service.getTipos()
			.subscribe((data: any) => {
				this.tipos = data;
				// console.log('Constructor: ', this.tipos);
			});
	}
	info(tipo: any) {
		this.detalle = tipo;
		this.tipos_service.getSub(this.detalle.id_subfuente)
			.subscribe((data: any) => {
				this.detalle.nom_subfuente = data.nombre;
			});
	}

	eliminarActivar(id: string, bandera: boolean) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.tipos_service.eliminarTipo(id, bandera)
			.subscribe((response: any) => {
				if (response.mensaje === 'eliminado') {
					console.log('Tipo Eliminada');
					this.getTipos();
				} else {
					console.log('Tipo Activada');
					this.getTipos();
				}
			});
	}

}
