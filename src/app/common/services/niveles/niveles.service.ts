import { Injectable } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';

@Injectable({
  providedIn: 'root'
})

export class NivelesService {

  constructor(
	  private constants: ConstantsService
  ) { } 
  
  getAllLevels() {
    return this.constants.getRequest('/get_all_levels_user', 'get', false);
  }

  getLevelsUserByCompany(id_empresa: string) {
    return this.constants.getRequest(`/get_levels_user_by_company/${id_empresa}`, 'get', false);
  }

  getLevelUser(id_level: string) {
    return this.constants.getRequest(`/get_level_user/${id_level}`, 'get', false);
  }

  validateNameLevelUser(datos: any) {
    return this.constants.getRequest('/validate_name_level_user', 'post', datos);
  }

  validateNumberLevelUser(datos: any) {
    return this.constants.getRequest('/validate_number_level_user', 'post', datos);
  }

  createRelationLevelUser(datos: any) {
    return this.constants.getRequest('/create_relation_level_user', 'post', datos);
  }

  updateRelationLevelUser(datos: any) {
    return this.constants.getRequest('/update_relation_level_user', 'put', datos);
  }

  deleteRelatioLevelUser(id_relacion: string) {
    return this.constants.getRequest(`/delete_relation_level_user/${id_relacion}`, 'delete', false);
  }

  // ****************************************************************************************** //
  // ********************  SERVICIOS PARA LA RELACION DE NIVELES CON CC  ********************** //
  // ****************************************************************************************** //

  getAllLevelsCc() {
    return this.constants.getRequest('/get_all_levels_cc', 'get', false);
  }

  getLevelsCcByCompany(id_empresa: string) {
    return this.constants.getRequest(`/get_levels_cc_by_company/${id_empresa}`, 'get', false);
  }

  getLevelCc(id_level: string) {
    return this.constants.getRequest(`/get_level_cc/${id_level}`, 'get', false);
  }

  validateNameLevelCc(datos: any) {
    return this.constants.getRequest('/validate_name_level_cc', 'post', datos);
  }

  validateNumberLevelCc(datos: any) {
    return this.constants.getRequest('/validate_number_level_cc', 'post', datos);
  }

  createRelationLevelCc(datos: any) {
    return this.constants.getRequest('/create_relation_level_cc', 'post', datos);
  }

  updateRelationLevelCc(datos: any) {
    return this.constants.getRequest('/update_relation_level_cc', 'put', datos);
  }

  deleteRelatioLevelCc(id_relacion: string) {
    return this.constants.getRequest(`/delete_relation_level_cc/${id_relacion}`, 'delete', false);
  }



}
