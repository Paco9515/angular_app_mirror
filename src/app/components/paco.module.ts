import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CcostoComponent } from './ui/ccosto/ccosto.component';
import { CcostosComponent } from './ui/ccosto/ccostos.component';
import { EmpresaComponent } from './ui/empresa/empresa.component';
import { EmpresasComponent } from './ui/empresa/empresas.component';
import { UnidadesAdminComponent } from './ui/unidadesAdmin/unidadesAdmin.component';
import { UnidadAdminComponent } from './ui/unidadesAdmin/unidadAdmin.component';
import { CtrabajosComponent } from './ui/ctrabajo/ctrabajos.component';
import { CtrabajoComponent } from './ui/ctrabajo/ctrabajo.component';
import { FinalidadesComponent } from './cfg/finalidad/finalidades.component';
import { FinalidadComponent } from './cfg/finalidad/finalidad.component';
import { FuncionComponent } from './cfg/funcion/funcion.component';
import { FuncionesComponent } from './cfg/funcion/funciones.component';
import { SubfuncionComponent } from './cfg/subfuncion/subfuncion.component';
import { SubfuncionesComponent } from './cfg/subfuncion/subfunciones.component';
import { FuentesComponent } from './cff/fuente/fuentes.component';
import { SubfuentesComponent } from './cff/subfuente/subfuentes.component';
import { TiposComponent } from './cff/tipo/tipos.component';
import { FuenteComponent } from './cff/fuente/fuente.component';
import { SubfuenteComponent } from './cff/subfuente/subfuente.component';
import { TipoComponent } from './cff/tipo/tipo.component';

@NgModule({
	declarations: [
		EmpresaComponent,
		EmpresasComponent,
		UnidadesAdminComponent,
		UnidadAdminComponent,
		CcostoComponent,
		CcostosComponent,
		CtrabajosComponent,
		CtrabajoComponent,
		FinalidadesComponent,
		FinalidadComponent,
		FuncionComponent,
		FuncionesComponent,
		SubfuncionComponent,
		SubfuncionesComponent,
		FuentesComponent,
		FuenteComponent,
		SubfuentesComponent,
		SubfuenteComponent,
		TiposComponent,
		TipoComponent
	],
	exports: [
		EmpresaComponent,
		EmpresasComponent,
		UnidadesAdminComponent,
		UnidadAdminComponent,
		CcostoComponent,
		CcostosComponent,
		CtrabajosComponent,
		CtrabajoComponent,
		FinalidadesComponent,
		FinalidadComponent,
		FuncionComponent,
		FuncionesComponent,
		SubfuncionComponent,
		SubfuncionesComponent,
		FuentesComponent,
		FuenteComponent,
		SubfuentesComponent,
		SubfuenteComponent,
		TiposComponent,
		TipoComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AdminRoutingModule
	]
})
export class PacoModule { }
