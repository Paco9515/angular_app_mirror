import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { NgForm } from '@angular/forms';
// import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { NivelesService } from 'src/app/common/services/niveles/niveles.service';

@Component({
    selector: 'app-niveles',
    templateUrl: './niveles.component.html'
  })

export class NivelesComponent { 
    constructor(
        private niveles: NivelesService,
        private mensaje: MensajesService
    ) {

    }
}