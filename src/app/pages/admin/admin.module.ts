import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
// import { ToastrModule } from 'ngx-toastr';
// import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { ClasificacionModule } from './classification/clasificacion.module';
import { SharedModule } from '../../shared/shared.module';
import { RichardModule } from '../../components/richard.module';
import { PacoModule } from '../../components/paco.module';

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
		SharedModule,
		AdminRoutingModule,
		ClasificacionModule,
		RichardModule,
		PacoModule
	]
})
export class AdminModule { }
