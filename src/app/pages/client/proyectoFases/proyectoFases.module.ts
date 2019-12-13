import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { FasesComponent } from './fases/fases.component';
import { FaseComponent } from './fases/fase.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoComponent } from './proyectos/proyecto.component';
import { CogComponent } from '../../../components/classification/clasfObjetoGasto/cog.component';
import { CffComponent } from '../../../components/classification/clasfFuenteFinanciamiento/cff.component';

// Route
import { PROYECTO_FASES_ROUTES } from './proyectoFases-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
	declarations: [
		FaseComponent,
		FasesComponent,
		ProyectoComponent,
		ProyectosComponent,
		CogComponent,
		CffComponent
	],
	exports: [
		FaseComponent,
		FasesComponent,
	],
	imports: [
		SharedModule,
		BrowserModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		BrowserAnimationsModule , //  módulo de animaciones requerido
		ToastrModule.forRoot(), //  ToastrModule agregado
		PROYECTO_FASES_ROUTES,
	]
})
export class ProyectoFasesModule { }
