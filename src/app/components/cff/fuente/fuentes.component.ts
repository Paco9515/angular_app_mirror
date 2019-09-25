import { Component, OnInit } from '@angular/core';
import { Fuente } from '../../../interfaces/cff.interface';
import { FuenteService } from '../../../services/cff/fuente.service';

@Component({
  selector: 'app-fuentes',
  templateUrl: './fuentes.component.html',
  styles: []
})
export class FuentesComponent {

  fuentes: Fuente[];
  detalle:any;

  constructor(
		private fuente_service: FuenteService
	) {
		this.fuentes = [];
		this.detalle = {
			id:'',  
		    codigo: '',
			nombre: '',		    
		    status: true
		}
		this.getFuentes();
	}

  getFuentes() {
		this.fuente_service.getFuentes()
			.subscribe((data: any) => {
				this.fuentes = data;
				//console.log('Constructor: ', this.fuentes);
			});
	}

	info(fuente:any){
		this.detalle=fuente;
	}

	eliminarActivar(id: string, bandera: boolean) {

		// this.programas = (this.programas.filter(data => data.id === id));

		this.fuente_service.eliminarFuente(id, bandera)
			.subscribe((response: any) => {
				if(response.mensaje === 'eliminado'){
					console.log('Fuente Eliminada');
					this.getFuentes();
				}else{
					console.log('Fuente Activada');
					this.getFuentes();
				}
			});
	}

}
