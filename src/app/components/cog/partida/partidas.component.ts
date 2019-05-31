import { Component } from '@angular/core';
import { Partidas } from './../../../interfaces/cog/partidas';
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
}