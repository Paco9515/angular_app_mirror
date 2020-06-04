import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
	  private constants: ConstantsService
  ) {
  }

  // ** FUNCION PARA VALIDAR LA INFORMACION INGRESADA EN EL LOGIN ** //
  loginUser(loginInfo: any) {
	  // console.log('desde el service', loginInfo);
	  return this.constants.getRequest(`/login`, 'post', loginInfo);
  }

  // ** FUNCION PARA GURADAR LOS DATOS DEL USUARIO LOGGEADO EN EL STORAGE  ** //
  setUser(userInfo: any): void {
    let user = {
			id: userInfo.id,
			nombre: userInfo.nombre,
			username: userInfo.username,
			id_nivel: userInfo.nivel_user,
			id_cc: userInfo.id_cc,
      img_name: userInfo.img_name,
      id_empresa: userInfo.id_empresa      
		};
	  const user_string = JSON.stringify(user);
	  localStorage.setItem('currentUser', user_string);
  }

  // ** FUNCION PARA GUARDAR EL TOKEN EN EL STORAGE  ** //
  setToken(token: any): void {
	  localStorage.setItem('accessT', token);
  }

  // ** FUNCION PARA GUARDAR EL USERNAME EN EL STORAGE  ** //
  setUsername(username: any): void {
	  localStorage.setItem('username', username);
  }

  // ** FUNCION PARA GUARDAR EL USERNAME EN EL STORAGE  ** //
  removeUsername(): void {
	  localStorage.removeItem('username');
  }
  
  // ** FUNCION PARA OBTENER EL TOKEN DE UN USUARIO DE LA BASE DE DATOS ** //
  validateToken(username:  any) {    
    return this.constants.getRequest(`/validate_token`, 'post', username);;
  }

  // ** FUNCION PARA OBTENER EL TOKEN ALMACENADO EN EL STORAGE ** //
  getTokenStorage() {
	  return localStorage.getItem('accessT');
  }

  // ** FUNCION PARA OBTENER LOS DATOS DEL USUARIO LOGGEADO ** //
  getCurrentUser() {
  	if (!isNullOrUndefined(localStorage.getItem('currentUser'))) {
  		return JSON.parse(localStorage.getItem('currentUser'));
  	} else {
  		return null;
  	}
  }

  // ** FUNCION PARA BORRAR LOS DATOS DE SESSION Y PODER SALIR DEL SISTEMA ** //
  logoutUser() {
  	localStorage.removeItem('accessT');
  	localStorage.removeItem('currentUser');
  }
}
