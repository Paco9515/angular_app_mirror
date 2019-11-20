import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ProgramasComponent } from '../pages/admin/classification/cp/programa/programas.component';
import { ProgramaComponent } from '../pages/admin/classification/cp/programa/programa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubprogramaComponent } from '../pages/admin/classification/cp/subprograma/subprograma.component';
import { SubprogramasComponent } from '../pages/admin/classification/cp/subprograma/subprogramas.component';
import { EgresosComponent } from '../pages/client/egresos/egresos.component';
import { CogComponent } from './classification/cog/cog.component';
import { CcComponent } from '../components/classification/cc/cc.component';
import { CaComponent } from '../components/classification/ca/ca.component';
import { CffComponent } from '../components/classification/cff/cff.component';
import { CfgComponent } from '../components/classification/cfg/cfg.component';
import { UiComponent } from '../components/classification/ui/ui.component';
import { ProyectoComponent } from '../pages/client/pe/proyectos/proyecto.component';
import { ProyectosComponent } from '../pages/client/pe/proyectos/proyectos.component';
import { FasesComponent } from '../pages/client/pe/fases/fases.component';
import { FaseComponent } from '../pages/client/pe/fases/fase.component';

@NgModule({
	declarations: [
		ProyectosComponent,
		ProyectoComponent,
		FasesComponent,
		FaseComponent,
		ProgramasComponent,
		ProgramaComponent,
		SubprogramaComponent,
		SubprogramasComponent,
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
