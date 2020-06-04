import { Component } from '@angular/core';
// import { UsuariosService } from 'src/app/common/services/usuario/usuarios.service';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';
import { NivelesService } from 'src/app/common/services/niveles/niveles.service';

@Component({
  selector: 'app-nivelesUser',
  templateUrl: './nivelesUser.component.html'
})
export class NivelesUserComponent {

  user: any;
  niveles: any; 
  nivel: any;
  cargado: boolean = false;
  banderaAdmin: boolean; 
  empresas: any;
  usuarios: any;
  id_empresa: string;

  constructor(
      private mensaje: MensajesService,
      // private usuariosService: UsuariosService,
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
      this.nivelService.getLevelsUserByCompany(id_empresa).subscribe((niveles: any) => {
        // console.log('niveles', niveles);
        if(niveles.data.length > 0) {
          this.cargado = true;
          this.niveles = niveles.data;
        } else {
          this.cargado = false;
        }
        // this.niveles = niveles.data;
      });
    }
    
  
    deleteNivelUser(id: string) {
      this.nivelService.deleteRelatioLevelUser(id).subscribe((resp: any) => {
        this.mensaje.success(resp);
        this.inicio();
      }, error => {
        this.mensaje.danger(error.error);
      });
    }
}

