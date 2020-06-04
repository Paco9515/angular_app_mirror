import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../shared/constants.service';
import { Usuario } from "../../interfaces/usuario.interface";


@Injectable({
	providedIn: 'root'
})

export class UsuariosService {

	url: string;
	constructor(
		private http: HttpClient,
		private constants: ConstantsService
	) {
		this.url = this.constants.url;
    }
    
    getUsuarios(id: string) {
		return this.constants.getRequest(`/get_users_cc/${id}`, 'get', false);
    }

    getUsuario(id: string) {
		return this.constants.getRequest(`/get_user/${id}`, 'get', false);
	}

	getUserXEmpresa(id_empresa: string) {
		return this.constants.getRequest(`/get_users_empresa/${id_empresa}`, 'get', false);
	}

	createUsuario(usuario: Usuario) {
		if (usuario.id === '') {
			// console.log('id_centro', usuario.id);
			return this.constants.getRequest(`/create_user`, 'post', usuario);
		} else {
			// console.log(usuario);
			return this.constants.getRequest(`/update_user_from_father`, 'put', usuario);
		}
    }

    activateUsuario(usuario: any) {
        return this.constants.getRequest(`/activate_user/${usuario}`, 'put', false);
    }	

	deleteUser(id: string) {
		return this.constants.getRequest(`/delete_user/${id}`, 'delete', false);	
	}

	getNivelesUser(datos: any) {
		// let user = JSON.parse(localStorage.getItem('currentUser'));
		return this.constants.getRequest(`/get_nivelesUser`, 'post', datos);
	}

	// ** FUNCION PARA TRAER LOS CENTROS DE COSTOS POR NIVEL ** // 
	getCcsNivel(id_cc_nivel: string) {
		// let user = JSON.parse(localStorage.getItem('currentUser'));
		return this.constants.getRequest(`/get_CcsUserAdmin/${id_cc_nivel}`, 'get', false);
	}

 	// ** FUNCION PARA TRAER LOS CENTROS DE COSTOS AL ADMIN EN LA VISTA NUEVO ** // 
	getCcsAdminNuevo(id_cc_nivel: string) {
		// let user = JSON.parse(localStorage.getItem('currentUser'));
		return this.constants.getRequest(`/get_CcsUserAdminNuevo/${id_cc_nivel}`, 'get', false);
	}

	// ** FUNCION PARA OBTENER LOS CENTROS DE UNA EMPRESA POR NIVELES ** // 
	getCcsAdminByEmpresa(datos: any) {
		// let user = JSON.parse(localStorage.getItem('currentUser'));
		return this.constants.getRequest(`/get_CcsUserAdminByEmpresa/`, 'post', datos);
	}

	// ** FUNCION PARA TRAER LOS CENTROS DE COSTOS AL ADMIN EN LA VISTA UPDATE ** // 
	getCcsAdminUpdate(id_cc_nivel: string) {
		// let user = JSON.parse(localStorage.getItem('currentUser'));
		return this.constants.getRequest(`/get_CcsUserAdminUpdate/${id_cc_nivel}`, 'get', false);
	}

	// ** FUNCION PARA TRAER LOS CENTROS DE COSTOS HIJOS AL CLIENTE EN LA VISTA CREAR ** // 
	getCcsClientNuevo(datos: any) {
		// let user = JSON.parse(localStorage.getItem('currentUser'));
		return this.constants.getRequest(`/get_CcsUserClientNuevo`, 'post', datos);
	}
	
	// ** FUNCION PARA TRAER LOS CENTROS DE COSTOS HIJOS AL CLIENTE EN LA VISTA UPDATE ** // 
	getCcsClientUpdate(datos: any) {
		// let user = JSON.parse(localStorage.getItem('currentUser'));
		return this.constants.getRequest(`/get_CcsUserClientUpdate`, 'post', datos);
	}
	
	// ** FUNCION PARA TRAER LOS DATOS DEL USUARIO A SU PERFIL ** //
	getInfoPerfil(id: string) {
		return this.constants.getRequest(`/get_user/${id}`, 'get', false);
	}

	// ** FUNCION PARA ACTUALIZAR LOS DATOS DEL USUARIO DESDE PERFIL ** //
	updateUserProfile(userInfo: any) {
		let user = {
			id: userInfo.id,
			nombre: userInfo.nombre,
			username: userInfo.username,
			id_nivel: userInfo.id_nivel,
			id_cc: userInfo.id_cc,
			img_name: userInfo.img_name
		};
		
		localStorage.setItem('currentUser', JSON.stringify(user));
		return this.constants.getRequest(`/update_user/`, 'put', userInfo);		
	}

	// ** FUNCION PARA CAMBIAR LA CONTRASEÑA  ** //
	updatePass(cambiarPass: any) {
		return this.constants.getRequest(`/update_user_pass/`, 'put', cambiarPass);
	}

	// ** Restablecer la contraseña de un usuario ** //
	resetPass(id_user: string) {
		return this.constants.getRequest(`/reboot_user_pass/${id_user}`, 'get', false);
	}

	// ** FUNCION PARA TRAER LA IMAGEN DE PERFIL DE UN USUARIO ** //
	getImage(id: string) {
		return this.constants.getRequest(`/get_image_user/${id}`, 'get', false);
	}

	// ** FUNCION PARA CAMBIAR LA IMAGEN DE PERFIL DE UN USUARIO ** //
	uploadImage(imagenParaSubir: FormData){
		
		// console.log('imagenSubir', imagenParaSubir.getAll('imagen')); 

		return this.constants.getRequest(`/update_user_image/`, 'post', imagenParaSubir);
		// return this.http.post(this.url_servidor, formData);
	}

	//** OBTENER EL ULTIMO NIVEL DE LOS USUARIOS DE UNA EMPRESA  ** //

	get_last_level_user_by_company(id_empresa: string) {
		return this.constants.getRequest(`/get_last_level_user_by_company/${id_empresa}`, 'get', false);
	}

	get_levels_admin_user_by_company(id_empresa: string) {
		return this.constants.getRequest(`/get_levels_admin_user_by_company/${id_empresa}`, 'get', false);
	}
}
