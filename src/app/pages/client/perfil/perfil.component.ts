import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MensajesService } from '../../../common/services/shared/mensajes.service';
import { UsuariosService } from '../../../common/services/usuario/usuarios.service';



@Component({
	selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    
    id_user:string;
    user: any;
    url_img: string;
    banderaCampos: boolean;
    pass: string;
    pass2: string;
    mensajePass: string;
    infoPass: any;
    banderaAlerta1: boolean;
    banderaAlerta2: boolean;
    imagenSeleccionada: boolean;
    imagenPerfil: any;
    formData: FormData;
    imagen: string;



	constructor(
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService,
        private router: Router,
        private userService: UsuariosService
	) { 
        console.log('3');
        this.id_user = '';    
        this.user = '';
        this.url_img = '';
        this.banderaCampos = true;
        this.pass = '';
        this.pass2 = '';
        this.mensajePass = '';
        this.infoPass = {
            id: '',
            pass: ''
        };
        this.banderaAlerta1 = false;
        this.banderaAlerta2 = false;
        this.imagenSeleccionada = true;
        

        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.id_user = user.id;
        this.imagenPerfil = '';
        this.formData = new FormData();  
        this.imagen = '';      
	}

	ngOnInit() {    
        console.log('4');    
        this.userService.getInfoPerfil(this.id_user).subscribe((data: any) => {
            this.user = data.data;
        });
        this.get_imagen();
    }

    get_imagen() {
        this.userService.getImage(this.id_user).subscribe((data: any) => {
            this.imagenPerfil = data.ruta;
        });
    }

    activarCampos() {
        if (this.banderaCampos == false) {
            this.banderaCampos = true;
        } else {
            this.banderaCampos = false;
        }
    }

    abrirCerrarModal() {
        this.mensajePass = '';
        this.infoPass = {
            id: '',
            pass: ''
        };
        this.pass = '';
        this.pass2 = '';
    }
    
    cambiarPass() {     
        if (this.pass != '') {
            if (this.pass2 != '') {
                if (this.pass.length >=  5) {
                    if (this.pass == this.pass2) {
                        this.infoPass = {
                            id: this.id_user,
                            pass: this.pass2
                        };
                        this.userService.updatePass(this.infoPass).subscribe((data) => {
                            this.banderaAlerta1 = false;
                            this.banderaAlerta2 = true;
                            this.mensajePass = 'Se cambio la contraseña.';
                        });                         
                    } else {
                        this.banderaAlerta1 = true;
                        this.banderaAlerta2 = false;
                        this.mensajePass = 'Las contraseñas no coinciden.';
                    }
                } else {
                    this.banderaAlerta1 = true;
                    this.banderaAlerta2 = false;
                    this.mensajePass = 'La contraseña debe ser mayor a 5 caracteres.';
                }
            } else {
                this.banderaAlerta1 = true;
                this.banderaAlerta2 = false;
                this.mensajePass = 'Favor de llenar los campos.';
            }            
        } else {
            this.banderaAlerta1 = true;
            this.banderaAlerta2 = false;
            this.mensajePass = 'Favor de llenar los campos.';
        }
    }

    seleccionarImagen(file: any) { 
        this.formData.append('id', this.id_user)       
        this.formData.append('imagen', file)
        this.imagenSeleccionada = false;
        // console.log('formData', this.formData.getAll('imagen'));     
    }

    cambiarImagen() {
        this.userService.uploadImage(this.formData).subscribe((data: any) => {            
            this.mensaje.success(data);
            this.get_imagen();
        }, error => {
            this.mensaje.danger(error);
            this.get_imagen();
        });

        this.imagen = '';
        
             
    }

	guardar(f: NgForm) {        
		this.userService.updateUserProfile(this.user)
        .subscribe((data: any) => {
            this.mensaje.success(data);
        }, error => {
            this.mensaje.success(error.error);
        });

        this.router.navigate(['/panel-adm']);
	}

	regresar() {
		this.router.navigate(['/panel-adm']);
	}

	
}
