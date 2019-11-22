import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { GeneroComponent } from './genero/genero.component';
import { GenerosComponent } from './genero/generos.component';
import { GrupoComponent } from './grupo/grupo.component';
import { GruposComponent } from './grupo/grupos.component';
import { RubroComponent } from './rubro/rubro.component';
import { RubrosComponent } from './rubro/rubros.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { CuentasComponent } from './cuenta/cuentas.component';
import { SubcuentaComponent } from './subcuenta/subcuenta.component';
import { SubcuentasComponent } from './subcuenta/subcuentas.component';

// Rutas
import { CLASF_CONTABLE_ROUTES } from './clasfContable-routing.module';

@NgModule({
	declarations: [
		GeneroComponent,
		GenerosComponent,
		GrupoComponent,
		GruposComponent,
		RubroComponent,
		RubrosComponent,
		CuentaComponent,
		CuentasComponent,
		SubcuentaComponent,
		SubcuentasComponent,
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
		CLASF_CONTABLE_ROUTES
	],
	exports: [
	]
})

export class ClasfContableModule { }

