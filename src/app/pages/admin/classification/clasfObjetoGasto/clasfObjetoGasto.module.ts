import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { CapitulosComponent } from './capitulo/capitulos.component';
import { CapituloComponent } from './capitulo/capitulo.component';
import { ConceptosComponent } from './concepto/conceptos.component';
import { ConceptoComponent } from './concepto/concepto.component';
import { PartidasComponent } from './partida/partidas.component';
import { PartidaComponent } from './partida/partida.component';
import { TipoGastosComponent } from './tipoGasto/tipo-gastos.component';
import { TipoGastoComponent } from './tipoGasto/tipo-gasto.component';

// Rutas
import { CLASF_OBJETO_GASTO_ROUTES } from './clasfObjetoGasto-routing.module';

@NgModule({
	declarations: [
		CapitulosComponent,
		CapituloComponent,
		ConceptoComponent,
		PartidaComponent,
		ConceptosComponent,
		PartidasComponent,
		TipoGastosComponent,
		TipoGastoComponent
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
		CLASF_OBJETO_GASTO_ROUTES,
	],
	exports: [
	]
})

export class ClasfObjetoGastoModule { }

