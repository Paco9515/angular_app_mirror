import { Component } from '@angular/core';
import { Partidas } from './../../../interfaces/cog.interface';
import { PartidaService } from './../../../services/cog/partida.service';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styles: []
})
export class PartidasComponent {

    partidas: Partidas[];

    constructor(
        private partida_service: PartidaService
    ) {
        this.partidas = [];
        this.getPartidas();
    }

    getPartidas() {
        this.partida_service.getPartidas()
            .subscribe((data: any) => {
                this.partidas = data;
            });
    }


	eliminar(id: string) {
		this.partida_service.eliminarSector(id)
			.subscribe((response: any) => {
				this.getPartidas();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Eliminado con exito.');
	}

	activar(sector: Partidas) {
		this.partida_service.activarPartida({
			id: sector.id,
			nombre: sector.nombre,
			status: !sector.status
		}).subscribe((data: any) => {
				this.getPartidas();
			}, error => {
				console.log('ERROR: ', error.error.message);
			});
		console.log('Activado con exito.');
	}
}