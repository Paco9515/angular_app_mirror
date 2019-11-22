import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { ProgramasComponent } from './programa/programas.component';
import { ProgramaComponent } from './programa/programa.component';
import { SubprogramasComponent } from './subprograma/subprogramas.component';
import { SubprogramaComponent } from './subprograma/subprograma.component';

// Rutas
import { CLASF_PROGRAMATICA_ROUTES } from './clasfProgramatica-routing.module';

@NgModule({
	declarations: [
		ProgramasComponent,
		ProgramaComponent,
		SubprogramaComponent,
		SubprogramasComponent,
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
		CLASF_PROGRAMATICA_ROUTES,
	],
	exports: [
	]
})

export class ClasfProgramaticaModule { }

