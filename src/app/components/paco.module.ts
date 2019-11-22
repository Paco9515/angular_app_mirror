import { NgModule } from '@angular/core';

import { AdminRoutingModule } from '../pages/admin/admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CcostoComponent } from '../pages/client/unidadesInternas/ccosto/ccosto.component';
import { CcostosComponent } from '../pages/client/unidadesInternas/ccosto/ccostos.component';
import { EmpresaComponent } from '../pages/admin/empresa/empresa.component';
import { EmpresasComponent } from '../pages/admin/empresa/empresas.component';
import { UnidadesAdminComponent } from '../pages/client/unidadesInternas/unidadesAdmin/unidadesAdmin.component';
import { UnidadAdminComponent } from '../pages/client/unidadesInternas/unidadesAdmin/unidadAdmin.component';
import { CtrabajosComponent } from '../pages/client/unidadesInternas/ctrabajo/ctrabajos.component';
import { CtrabajoComponent } from '../pages/client/unidadesInternas/ctrabajo/ctrabajo.component';
import { FinalidadesComponent } from '../pages/admin/classification/clasfFuncionalGasto/finalidad/finalidades.component';
import { FinalidadComponent } from '../pages/admin/classification/clasfFuncionalGasto/finalidad/finalidad.component';
import { FuncionComponent } from '../pages/admin/classification/clasfFuncionalGasto/funcion/funcion.component';
import { FuncionesComponent } from '../pages/admin/classification/clasfFuncionalGasto/funcion/funciones.component';
import { SubfuncionComponent } from '../pages/admin/classification/clasfFuncionalGasto/subfuncion/subfuncion.component';
import { SubfuncionesComponent } from '../pages/admin/classification/clasfFuncionalGasto/subfuncion/subfunciones.component';
import { FuentesComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/fuente/fuentes.component';
import { SubfuentesComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/subfuente/subfuentes.component';
import { TiposComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/tipo/tipos.component';
import { FuenteComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/fuente/fuente.component';
import { SubfuenteComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/subfuente/subfuente.component';
import { TipoComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/tipo/tipo.component';


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
