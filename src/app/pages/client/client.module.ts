import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { ProyectoFasesModule } from './proyectoFases/proyectoFases.module';
import { UnidadesInternasModule } from './unidadesInternas/unidadesInternas.module';
import { SharedModule } from '../../shared/shared.module';


// Rutas
import { ClientRoutingModule } from './client-routing.module';

// Componentes
import { ClientComponent } from './client.component';
import { EgresosComponent } from './egresos/egresos.component';
import { CaComponent } from '../../components/classification/clasfAdministrativa/ca.component';
import { CcComponent } from '../../components/classification/clasfContable/cc.component';
import { CffComponent } from '../../components/classification/clasfFuenteFinanciamiento/cff.component';
import { CfgComponent } from '../../components/classification/clasfFuncionalGasto/cfg.component';
import { CogComponent } from '../../components/classification/clasfObjetoGasto/cog.component';
import { CpComponent } from '../../components/classification/clasfProgramatica/cp.component';
import { PeComponent } from '../../components/classification/proyectoFases/pe.component';
import { UiComponent } from '../../components/classification/unidadesInternas/ui.component';

@NgModule({
	declarations: [
		// EscritorioComponent,
		ClientComponent,
		EgresosComponent,
		CaComponent,
		CcComponent,
		CffComponent,
		CfgComponent,
		CogComponent,
		CpComponent,
		PeComponent,
		UiComponent
	],
	exports: [
		// EscritorioComponent,
		ClientComponent,
		EgresosComponent,
		CaComponent,
		CcComponent,
		CffComponent,
		CfgComponent,
		CogComponent,
		CpComponent,
		PeComponent,
		UiComponent
	],
	imports: [
		ChartsModule,
		SharedModule,
		ClientRoutingModule,
		ProyectoFasesModule,
		UnidadesInternasModule,
		CommonModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class ClientModule { }
