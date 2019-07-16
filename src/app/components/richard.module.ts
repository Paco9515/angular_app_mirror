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

@NgModule({
	declarations: [
		ProgramasComponent,
		ProgramaComponent,
		SubprogramaComponent,
		SubprogramasComponent,
		CogComponent,
		CcComponent,
		CaComponent,
		EgresosComponent
	],
	exports: [
		ProgramasComponent,
		ProgramaComponent
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
