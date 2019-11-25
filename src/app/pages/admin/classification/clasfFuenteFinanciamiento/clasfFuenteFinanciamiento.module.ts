import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { FuenteComponent } from './fuente/fuente.component';
import { FuentesComponent } from './fuente/fuentes.component';
import { SubfuenteComponent } from './subfuente/subfuente.component';
import { SubfuentesComponent } from './subfuente/subfuentes.component';
import { TipoComponent } from './tipo/tipo.component';
import { TiposComponent } from './tipo/tipos.component';

// Route
import { CLASF_FFINANCIAMIENTO_ROUTES } from './clasfFuenteFinanciamiento-routing.module';

@NgModule({
	declarations: [
		FuenteComponent,
		FuentesComponent,
		SubfuenteComponent,
		SubfuentesComponent,
		TipoComponent,
		TiposComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		BrowserAnimationsModule , //  módulo de animaciones requerido
		ToastrModule.forRoot(), //  ToastrModule agregado
		CLASF_FFINANCIAMIENTO_ROUTES
	],
	exports: [
	]
})
export class ClasfFuenteFinanciamientoModule { }
