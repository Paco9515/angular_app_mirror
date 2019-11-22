import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../../shared/shared.module';
import { RichardModule } from '../../components/richard.module';
import { PacoModule } from '../../components/paco.module';

import { ClasfContableModule } from './classification/clasfContable/clasfContable.module';
import { ClasfObjetoGastoModule } from './classification/clasfObjetoGasto/clasfObjetoGasto.module';
import { ClasfProgramaticaModule } from './classification/clasfProgramatica/clasfProgramatica.module';
import { ClasfAdministrativaModule } from './classification/clasfAdministrativa/clasfAdministrativa.module';

// Rutas
import { AdminRoutingModule } from './admin-routing.module';

// Componentes
import { AdminComponent } from './admin.component';
import { EscritorioComponent } from '../escritorio/escritorio.component';

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
		PacoModule,
		AdminRoutingModule,
		ToastrModule.forRoot(),
		ClasfContableModule,
		ClasfObjetoGastoModule,
		ClasfProgramaticaModule,
		ClasfAdministrativaModule
	]
})
export class AdminModule { }
