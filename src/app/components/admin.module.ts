import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { ProgramasComponent } from './cp/programa/programas.component';
import { ProgramaComponent } from './cp/programa/programa.component';
import { EscritorioComponent } from './escritorio/escritorio.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
// import { ChartsModule } from 'node_modules/ng2-charts';
// import { ChartsModule } from 'ng2-charts';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProgressComponent } from './progress/progress.component';
import { IncrementadorComponent } from '../reusable/incrementador/incrementador.component';

@NgModule({
	declarations: [
		ProgramasComponent,
		EscritorioComponent,
		ProgramaComponent,
		AdminComponent,
		ProgressComponent,
		IncrementadorComponent
	],
	exports: [
		ProgramasComponent,
		EscritorioComponent,
		ProgramaComponent,
		AdminComponent,
		ProgressComponent,
	],
	imports: [
		ChartsModule,
		CommonModule,
		SharedModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AdminRoutingModule
	]
})
export class AdminModule { }
