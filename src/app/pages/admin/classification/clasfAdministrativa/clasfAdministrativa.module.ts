import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { SectorComponent } from './sector/sector.component';
import { SectoresComponent } from './sector/sectores.component';
import { FinancieroComponent } from './financiero/financiero.component';
import { FinancierosComponent } from './financiero/financieros.component';
import { EconomiaComponent } from './economia/economia.component';
import { EconomiasComponent } from './economia/economias.component';
import { ClasAdministrativasComponent } from './administrativa/clas-administrativas.component';
import { ClasAdministrativaComponent } from './administrativa/clas-administrativa.component';
import { SubeconomiaComponent } from './subeconomia/subeconomia.component';
import { SubeconomiasComponent } from './subeconomia/subeconomias.component';

// Rutas
import { CLASF_ADMINITRACION_ROUTES } from './clasfAdministrativa-routing.module';

@NgModule({
	declarations: [
		SectorComponent,
		SectoresComponent,
		FinancieroComponent,
		FinancierosComponent,
		EconomiaComponent,
		EconomiasComponent,
		ClasAdministrativasComponent,
		ClasAdministrativaComponent,
		SubeconomiaComponent,
		SubeconomiasComponent,
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
		CLASF_ADMINITRACION_ROUTES
	],
	exports: [
	]
})
export class ClasfAdministrativaModule { }
