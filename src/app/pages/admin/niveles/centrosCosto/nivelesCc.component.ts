import { Component } from '@angular/core';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';
import { NivelesService } from 'src/app/common/services/niveles/niveles.service';

@Component({
  selector: 'app-nivelesCc',
  templateUrl: './nivelesCc.component.html'
})
export class NivelesCcComponent {

  user: any;
  niveles: any; 
  nivel: any;
  cargado: boolean = false;
  banderaAdmin: boolean; 
  empresas: any;
  id_empresa: string;
  
  constructor(
      private mensaje: MensajesService,
      private empresaService: EmpresaService,
      private nivelService: NivelesService
  ) {
    this.nivel = null;    
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.user = user;
    this.nivel = user.id_nivel;

    if (this.nivel != null) {
          this.banderaAdmin = false;						
      } else {
          this.banderaAdmin = true;	                
      }   

    this.inicio();    
  }

  inicio() {
    if(this.banderaAdmin == true) {
      this.empresaService.getEmpresas().subscribe((empresas: any) => {
        // console.log(this.empresas);
        this.empresas = empresas;
      });        
      this.get_levels('2');
    } else {
      this.get_levels(this.user.id_empresa);
    }  
  }

  get_levels(id_empresa: string) {
    this.nivelService.getLevelsCcByCompany(id_empresa).subscribe((niveles: any) => {
      // console.log('niveles', niveles);
      if(niveles.length > 0) {
        this.cargado = true;
        this.niveles = niveles;
      } else {
        this.cargado = false;
      }
      // this.niveles = niveles.data;
    });
  }
  

  deleteNivelCc(id: string) {
    this.nivelService.deleteRelatioLevelCc(id).subscribe((resp: any) => {
      this.mensaje.success(resp);
      this.inicio();
    }, error => {
      this.mensaje.danger(error.error);
    });
  }
}