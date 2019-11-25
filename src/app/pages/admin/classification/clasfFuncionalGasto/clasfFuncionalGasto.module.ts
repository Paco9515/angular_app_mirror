import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { FinalidadComponent } from './finalidad/finalidad.component';
import { FinalidadesComponent } from './finalidad/finalidades.component';
import { FuncionComponent } from './funcion/funcion.component';
import { FuncionesComponent } from './funcion/funciones.component';
import { SubfuncionComponent } from './subfuncion/subfuncion.component';
import { SubfuncionesComponent } from './subfuncion/subfunciones.component';

// Route
import { CLASF_FUNCIONAL_GASTO_ROUTES } from './clasfFuncionalGasto-routing.module';

@NgModule({
	declarations: [
		FinalidadComponent,
		FinalidadesComponent,
		FuncionComponent,
		FuncionesComponent,
		SubfuncionComponent,
		SubfuncionesComponent
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
		CLASF_FUNCIONAL_GASTO_ROUTES
	],
	exports: [
	]
})
export class ClasfFuncionalGastoModule { }
