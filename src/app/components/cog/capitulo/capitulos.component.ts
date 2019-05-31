import { Component } from '@angular/core';
import { Capitulos } from 'src/app/interfaces/cog/capitulos';
import { CapituloService } from 'src/app/services/cog/capitulo.service';

@Component({
	selector: 'app-capitulos',
	templateUrl: './capitulos.component.html',
	styles: []
})
export class CapitulosComponent {

	capitulos: Capitulos[];

	constructor(
		private capitulo_service: CapituloService
	) {
		this.capitulos = [];
		this.getCapitulos();
	}

	getCapitulos() {
		this.capitulo_service.getCapitulos()
		.subscribe( (data: any) => {
				this.capitulos = data;
			});
	}

	eliminar(id: string, index: string){
		this.capitulo_service.deleteCapitulo(id)
		.subscribe((response: any) => {
			this.getCapitulos();
		}, error => {
			console.log('ERROR: ', error.error.message);
		});
		console.log('Eliminado con exito.');
	}

	activar(capitulo: Capitulos, index: string) {

		this.capitulo_service.activarCapitulo({
			id: capitulo.id,
			nombre: capitulo.nombre,
			status: !capitulo.status
		}).subscribe((response: any) => {
				this.getCapitulos();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Activado con exito.');
	}

}
