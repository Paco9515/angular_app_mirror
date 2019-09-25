import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ProgramasComponent } from './cp/programa/programas.component';
import { ProgramaComponent } from './cp/programa/programa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubprogramaComponent } from './cp/subprograma/subprograma.component';
import { SubprogramasComponent } from './cp/subprograma/subprogramas.component';
import { EgresosComponent } from './egresos/egresos.component';
import { CogComponent } from './cog/cog/cog.component';
import { CcComponent } from './cc/cc/cc.component';
import { CaComponent } from './ca/ca/ca.component';
import { CffComponent } from './cff/cff/cff.component';
import { CfgComponent } from './cfg/cfg/cfg.component';
import { UiComponent } from './ui/ui/ui.component';
import { ProyectoComponent } from './pe/proyectos/proyecto.component';
import { ProyectosComponent } from './pe/proyectos/proyectos.component';
import { FasesComponent } from './pe/fases/fases.component';
import { FaseComponent } from './pe/fases/fase.component';

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
