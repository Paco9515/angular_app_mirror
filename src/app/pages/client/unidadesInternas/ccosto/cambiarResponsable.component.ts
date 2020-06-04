import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { NgForm } from '@angular/forms';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { NivelesService } from 'src/app/common/services/niveles/niveles.service';

@Component({
  selector: 'app-cambiarResponsable',
  templateUrl: './cambiarResponsable.component.html',
  styles: []
})
export class CambiarResponsableComponent {
    user: any;
    nivel: string;
    niveles: any;
    centro: string;
    centros: any;
    banderaCentros: boolean = true;
    banderaGuardar: boolean = true;

    constructor(
        private ccostoService: CcostoService,
        private nivelesService: NivelesService,
        private mensaje: MensajesService
    ) {

        this.nivel = '';
        this.centro = '';
        this.niveles = [];
        this.centros = [];
        this.user = JSON.parse(localStorage.getItem('currentUser'));        

        this.inicio();
    }

    inicio() {
        this.nivelesService.getLevelsCcByCompany(this.user.id_empresa).subscribe((niveles: any) => {
            // console.log('niveles', niveles);
            this.niveles = niveles;
        })
    }

    cargarCentros(id_nivel: string) {
        if(id_nivel != '') {
            let datos = {
                id_empresa: this.user.id_empresa,
                id_nivel: id_nivel
            };
            this.banderaCentros = false;
            this.ccostoService.getCcostosByLevelAndCompany(datos).subscribe((centros: any) => {
                // console.log('centros', centros);
                if(centros.length > 0) {                
                    this.centros = centros;
                } else {
                    let mensaje = {
                        title: 'Error',
                        message: 'No existen centros con ese nivel aún.'
                    }
    
                    return this.mensaje.danger(mensaje);
                }
            });
        } else {
            let mensaje = {
                title: 'Error',
                message: 'Elija una opcion valida.'
            };
            
            return this.mensaje.danger(mensaje);
        }
    }

    habilitarBoton(id_cc: string) {
        this.banderaGuardar = true;
        if(id_cc != '') {            
            this.ccostoService.validateResponsable(id_cc).subscribe((resp: any) => {
                // console.log('Resp', resp);
                if(resp) {
                    this.banderaGuardar = true;
                    let mensaje = {
                        title: 'Error',
                        message: 'El centro seleccionado es el responsable actual.'
                    }

                    return this.mensaje.danger(mensaje);
                } else {
                    this.banderaGuardar = false;
                }
            });

        } else {
            this.banderaGuardar = true;
            let mensaje = {
                title: 'Error',
                message: 'Elija una opcion valida.'
            };
            
            return this.mensaje.danger(mensaje);
        }
    }

    guardar() {
        this.ccostoService.establecerReponsable(this.centro).subscribe((resp: any) => {
            return this.mensaje.success(resp, '/panel-adm/ccostos');
        }, error => {
            return this.mensaje.danger(error.error);
        });
    }
}
