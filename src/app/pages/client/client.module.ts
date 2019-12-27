import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { ProyectoFasesModule } from './proyectoFases/proyectoFases.module';
import { UnidadesInternasModule } from './unidadesInternas/unidadesInternas.module';
import { SharedModule } from '../../shared/shared.module';

// Servicios

// Rutas
import { ClientRoutingModule } from './client-routing.module';

// Componentes
import { ClientComponent } from './client.component';
import { EgresosComponent } from './egresos/egresos.component';
import { EgresoComponent } from './egresos/egreso.component';
import { CambioEgresoComponent } from './egresos/cambioEgreso/cambioEgreso.component';
import { CaComponent } from '../../components/classification/clasfAdministrativa/ca.component';
import { CcComponent } from '../../components/classification/clasfContable/cc.component';
import { CfgComponent } from '../../components/classification/clasfFuncionalGasto/cfg.component';
import { CpComponent } from '../../components/classification/clasfProgramatica/cp.component';
import { PeComponent } from '../../components/classification/proyectoFases/pe.component';
import { UiComponent } from '../../components/classification/unidadesInternas/ui.component';

@NgModule({
	declarations: [
		// EscritorioComponent,
		ClientComponent,
		EgresosComponent,
		EgresoComponent,
		CambioEgresoComponent,
		CaComponent,
		CcComponent,
		CfgComponent,
		CpComponent,
		PeComponent,
		UiComponent
	],
	exports: [
		// EscritorioComponent,
		ClientComponent,
		EgresosComponent,
		EgresoComponent,
		CambioEgresoComponent,
		CaComponent,
		CcComponent,
		CfgComponent,
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
	],
	providers:[]
})
export class ClientModule { }
