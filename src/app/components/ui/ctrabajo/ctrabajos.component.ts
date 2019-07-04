import { Component, OnInit } from '@angular/core';
import { CtrabajoService } from "src/app/services/ui/ctrabajo.service";
import { Ctrabajo } from "src/app/interfaces/ui.interface";

@Component({
  selector: 'app-ctrabajos',
  templateUrl: './ctrabajos.component.html',
  styles: []
})
export class CtrabajosComponent  {

  ctrabajos: Ctrabajo[];
  detalle:any;

  constructor(
		private ctrabajo_service: CtrabajoService
	) {
		this.ctrabajos = [];
		this.detalle = {
			id:'',  
			id_centro_costo: '', 
			nom_centro_costo: '',
			codigo:'',
			nombre:'',
		    estado: '',
			municipio: '',		    
			localidad: '',
			cp: '',
			colonia: '',
			calle: '',
			num_exterior: '',
			dom_interior: '',
			num_interior: '',
		    status: true
		};
		this.getCtrabajos();
	}

  getCtrabajos() {
		this.ctrabajo_service.getCtrabajos()
			.subscribe((data: any) => {
				this.ctrabajos = data;
				//console.log('Constructor: ', this.ctrabajos);
			});
	}

	info(ctrabajo:any){
		this.detalle=ctrabajo;
		this.ctrabajo_service.getCentro(ctrabajo.id_centro_costo).subscribe((data: any) => {
			this.detalle.nom_centro_costo = data.nombre;
		});
		//console.log('info modal',this.detalle);
	}

	eliminarActivar(id: string, bandera: boolean) {
		this.ctrabajo_service.eliminarCtrabajo(id, bandera)
			.subscribe((response: any) => {
				if(response.mensaje === 'eliminado'){
					console.log('Centro Eliminada');
					this.getCtrabajos();
				}else{
					console.log('Centro Activada');
					this.getCtrabajos();
				}
			});
	}

}