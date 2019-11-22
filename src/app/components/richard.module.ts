import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AdminRoutingModule } from '../pages/admin/admin-routing.module';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EgresosComponent } from '../pages/client/egresos/egresos.component';
import { CogComponent } from './classification/clasfObjetoGasto/cog.component';
import { CcComponent } from './classification/clasfContable/cc.component';
import { CaComponent } from './classification/clasfAdministrativa/ca.component';
import { CffComponent } from './classification/clasfFuenteFinanciamiento/cff.component';
import { CfgComponent } from './classification/clasfFuncionalGasto/cfg.component';
import { UiComponent } from './classification/unidadesInternas/ui.component';
import { ProyectoComponent } from '../pages/client/proyectoFases/proyectos/proyecto.component';
import { ProyectosComponent } from '../pages/client/proyectoFases/proyectos/proyectos.component';
import { FasesComponent } from '../pages/client/proyectoFases/fases/fases.component';
import { FaseComponent } from '../pages/client/proyectoFases/fases/fase.component';

@NgModule({
	declarations: [
		ProyectosComponent,
		ProyectoComponent,
		FasesComponent,
		FaseComponent,

		CogComponent,
		CcComponent,
		CaComponent,
		CffComponent,
		CfgComponent,
		UiComponent,
		EgresosComponent,
	],
	exports: [
		ProyectosComponent,
		ProyectoComponent,
		FasesComponent,
		FaseComponent
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
export class RichardModule { }
