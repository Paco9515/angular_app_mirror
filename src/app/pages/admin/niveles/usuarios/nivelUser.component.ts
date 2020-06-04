import { Component } from '@angular/core';
// import { UsuariosService } from 'src/app/common/services/usuario/usuarios.service';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';
import { NivelesService } from 'src/app/common/services/niveles/niveles.service';
import { ActivatedRoute } from '@angular/router';
import { nivelUser } from 'src/app/common/interfaces/niveles.interface';
import { NgForm } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-nivelUser',
  templateUrl: './nivelUser.component.html'
})
export class NivelUserComponent {

    // forma_inicial: nivelUser;
    forma: nivelUser;
    banderaAdmin: boolean; 
    banderaCreate: boolean;
    empresas: any;
    levels: any;
    user: any;
    variable1: boolean = true;
    variable2: boolean = true;

    constructor(
        private mensaje: MensajesService,
        // private usuariosService: UsuariosService,
        private empresaService: EmpresaService,
        private nivelService: NivelesService,
        private activatedRouter: ActivatedRoute
    ) {
       
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.user = user;  
        this.forma = {
            id: '',
            id_empresa: '',
            id_nom_nivel_user: '',
            nivel_user: ''
        };

        if (user.id_nivel != null) {
            this.banderaAdmin = false;    
            // console.log('no admin');        					
        } else {
            this.banderaAdmin = true;
            this.empresaService.getEmpresas().subscribe((empresas: any) => {
                // console.log('admin');
                // console.log('empresas', empresas);                
                this.empresas = empresas;
            });	            
        } 
        
        this.nivelService.getAllLevels().subscribe((niveles: any) => {
            // console.log('niveles', niveles);
            this.levels = niveles;
        });
        
        this.activatedRouter.params.subscribe((params: any) => {
            if(params.id == 'nuevo') {
                this.banderaCreate = true;
                if(this.banderaAdmin == false) {
                    this.forma.id_empresa = user.id_empresa;
                } else {
                    this.forma.id_empresa = '';
                }
            } else {
                this.banderaCreate = false;
                this.loadInfoLevel(params.id);
            }
        });     
    }
    
    
    loadInfoLevel(id_level_user: string) {
        this.nivelService.getLevelUser(id_level_user).subscribe((level: nivelUser) => {
            this.forma = level[0];
            // this.forma_inicial = level;
            // console.log('forma original', this.forma);
        });
    }

    validarCampos(f: NgForm) {
        // console.log(f.form.controls.id_nivel.pristine);
        // console.log(f.form.controls.nivel.pristine);
        // console.log(this.forma);
        if(this.banderaCreate) {            
            this.nivelService.validateNameLevelUser(this.forma).subscribe((respuesta: any) => {
                // console.log('mensaje numero validado', respuesta);
                if(respuesta.length > 0) {
                    let mensaje = {
                        title: 'Error',
                        message: 'El nombre de nivel elegido ya esta en uso.'
                    };
                    this.variable1 = true;
                    return this.mensaje.danger(mensaje);
                } else {
                    this.variable1 = false;
                    this.nivelService.validateNumberLevelUser(this.forma).subscribe((respuesta: any) => {
                        // console.log('mensaje numero validado', respuesta);
                        if(respuesta.length > 0) {
                            let mensaje = {
                                title: 'Error',
                                message: 'El numero de nivel ingresado le pertenece al ' + respuesta[0].nombre_nivel + '.'
                            };
                            this.variable2 = true;
                            return this.mensaje.danger(mensaje);
                        } else {
                            this.variable2 = false;
                            this.guardar(f);
                        }
                    });
                }
            });    
        }else {
            if(!f.form.controls.id_nivel.pristine) {
                // console.log('1er if');
                this.nivelService.validateNameLevelUser(this.forma).subscribe((respuesta: any) => {
                    // console.log('mensaje numero validado', respuesta);
                    if(respuesta.length > 0) {
                        let mensaje = {
                            title: 'Error',
                            message: 'El nombre de nivel elegido ya esta en uso.'
                        };
                        this.variable1 = true;
                        return this.mensaje.danger(mensaje);
                    } else  {
                        this.variable1 = false;
                    }

                    if(!f.form.controls.nivel.pristine) {                        
                        // console.log('2do if');
                        this.nivelService.validateNumberLevelUser(this.forma).subscribe((respuesta: any) => {
                            // console.log('mensaje numero validado', respuesta);
                            if(respuesta.length > 0) {
                                let mensaje = {
                                    title: 'Error',
                                    message: 'El numero de nivel ingresado le pertenece al ' + respuesta[0].nombre_nivel + '.'
                                };
                                this.variable2 = true;
                                return this.mensaje.danger(mensaje);
                            } else {
                                this.variable2 = false;
                                this.guardar(f);
                            }
                        });
                    } else {
                        this.guardar(f);
                    }
                });
            }else if(!f.form.controls.nivel.pristine) {
                //console.log('2do if');
                this.nivelService.validateNumberLevelUser(this.forma).subscribe((respuesta: any) => {
                    // console.log('mensaje numero validado', respuesta);
                    if(respuesta.length > 0) {
                        let mensaje = {
                            title: 'Error',
                            message: 'El numero de nivel ingresado le pertenece al ' + respuesta[0].nombre_nivel + '.'
                        };
                        this.variable2 = true;
                        return this.mensaje.danger(mensaje);
                    } else{
                        this.variable2 = false;
                    } 
                    if(!f.form.controls.id_nivel.pristine) {                        
                        // console.log('1er if');
                        this.nivelService.validateNameLevelUser(this.forma).subscribe((respuesta: any) => {
                            // console.log('mensaje numero validado', respuesta);
                            if(respuesta.length > 0) {
                                let mensaje = {
                                    title: 'Error',
                                    message: 'El nombre de nivel elegido ya esta en uso.'
                                };
                                this.variable1 = true;
                                return this.mensaje.danger(mensaje);
                            } else {
                                this.variable1 = false;
                                this.guardar(f);
                            }
                        });
                    } else {
                        this.guardar(f);
                    }
                    
                });
                
            }
             
        }      
    }

    guardar(f: NgForm) {
		if (f.valid) {                         
            console.log('forma a guardar', this.forma);
            if(this.banderaCreate) {
                if(!this.variable1 && !this.variable2){
                    // console.log('Exito, lo creaste perro..');
                    this.nivelService.createRelationLevelUser(this.forma)
                    .subscribe((resp: any) => {
                        // console.log('resp', resp);
                        this.mensaje.success(resp, 'panel-adm/nivelesUser');
                    }, error => {
                        // console.log('error',error);
                        this.mensaje.danger(error.error);
                    }); 
                } else {
                    console.log('No ase pudo crear la realcion de nivel, lle todos los campos mamon...');
                }
            } else {
                if(!this.variable1 || !this.variable2) {
                    console.log('Exito, lo editaste perro..');
                    this.nivelService.updateRelationLevelUser(this.forma)
                    .subscribe((resp: any) => {
                        // console.log('resp', resp);
                        this.mensaje.success(resp, 'panel-adm/nivelesUser');
                    }, error => {
                        // console.log('error',error);
                        this.mensaje.danger(error.error);
                    }); 
                } else {
                    console.log('No puedes guradar cmabios sin cambiar nada no mames...');
                }
            }
                   
		} 		
	}
}

