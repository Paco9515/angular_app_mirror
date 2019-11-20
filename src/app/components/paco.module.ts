import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CcostoComponent } from '../pages/client/ui/ccosto/ccosto.component';
import { CcostosComponent } from '../pages/client/ui/ccosto/ccostos.component';
import { EmpresaComponent } from '../pages/admin/empresa/empresa.component';
import { EmpresasComponent } from '../pages/admin/empresa/empresas.component';
import { UnidadesAdminComponent } from '../pages/client/ui/unidadesAdmin/unidadesAdmin.component';
import { UnidadAdminComponent } from '../pages/client/ui/unidadesAdmin/unidadAdmin.component';
import { CtrabajosComponent } from '../pages/client/ui/ctrabajo/ctrabajos.component';
import { CtrabajoComponent } from '../pages/client/ui/ctrabajo/ctrabajo.component';
import { FinalidadesComponent } from '../pages/admin/classification/cfg/finalidad/finalidades.component';
import { FinalidadComponent } from '../pages/admin/classification/cfg/finalidad/finalidad.component';
import { FuncionComponent } from '../pages/admin/classification/cfg/funcion/funcion.component';
import { FuncionesComponent } from '../pages/admin/classification/cfg/funcion/funciones.component';
import { SubfuncionComponent } from '../pages/admin/classification/cfg/subfuncion/subfuncion.component';
import { SubfuncionesComponent } from '../pages/admin/classification/cfg/subfuncion/subfunciones.component';
import { FuentesComponent } from '../pages/admin/classification/cff/fuente/fuentes.component';
import { SubfuentesComponent } from '../pages/admin/classification/cff/subfuente/subfuentes.component';
import { TiposComponent } from '../pages/admin/classification/cff/tipo/tipos.component';
import { FuenteComponent } from '../pages/admin/classification/cff/fuente/fuente.component';
import { SubfuenteComponent } from '../pages/admin/classification/cff/subfuente/subfuente.component';
import { TipoComponent } from '../pages/admin/classification/cff/tipo/tipo.component';


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
