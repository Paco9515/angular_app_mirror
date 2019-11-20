import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { EscritorioComponent } from '../pages/escritorio/escritorio.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RichardModule } from './richard.module';
import { CristiModule } from './cristi.module';
import { PacoModule } from './paco.module';
import { EgresosComponent } from '../pages/client/egresos/egresos.component';

@NgModule({
	declarations: [
		EscritorioComponent,
		AdminComponent,
		// EgresosComponent
	],
	exports: [
		EscritorioComponent,
		AdminComponent,
	],
	imports: [
		ChartsModule,
		CommonModule,
		SharedModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RichardModule,
		CristiModule,
		PacoModule,
		AdminRoutingModule
	]
})
export class AdminModule { }
