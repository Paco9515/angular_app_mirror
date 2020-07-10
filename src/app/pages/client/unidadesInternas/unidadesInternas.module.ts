import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { CcostosComponent } from './ccosto/ccostos.component';
import { CcostoComponent } from './ccosto/ccosto.component';
import { CtrabajoComponent } from './ctrabajo/ctrabajo.component';
import { CtrabajosComponent } from './ctrabajo/ctrabajos.component';
import { UnidadAdminComponent } from './unidadesAdmin/unidadAdmin.component';
import { UnidadesAdminComponent } from './unidadesAdmin/unidadesAdmin.component';

// Route
import { UINIDADES_ADMINISTRATIVAS_ROUTES } from './unidadesInternas-routing.module';
import { CcostoAdminComponent } from './ccosto/ccostoAdmin.component';
import { CambiarResponsableComponent } from './ccosto/cambiarResponsable.component';
import { NivelesComponent } from './niveles/niveles.component';

@NgModule({
	declarations: [
		CcostoComponent,
		CcostoAdminComponent,
		CcostosComponent,
		CtrabajoComponent,
		CtrabajosComponent,
		UnidadAdminComponent,
		UnidadesAdminComponent,
		CambiarResponsableComponent,
		NivelesComponent,
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
		UINIDADES_ADMINISTRATIVAS_ROUTES
	],
	exports: [
	]
})
export class UnidadesInternasModule { }
