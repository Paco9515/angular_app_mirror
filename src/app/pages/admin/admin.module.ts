import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
// import { ToastrModule } from 'ngx-toastr';
// import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

// Modulos
import { ClasificacionModule } from './classification/clasificacion.module';
import { SharedModule } from '../../shared/shared.module';
// import { RichardModule } from '../../components/richard.module';

// Rutas
import { AdminRoutingModule } from './admin-routing.module';

// Componentes
import { AdminComponent } from './admin.component';
import { EscritorioComponent } from '../escritorio/escritorio.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresasComponent } from './empresa/empresas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { UsuarioAdminComponent } from './usuarios/usuarioAdmin.component';
import { NivelesCcComponent } from './niveles/centrosCosto/nivelesCc.component';
import { NivelesUserComponent } from './niveles/usuarios/nivelesUser.component';
import { NivelUserComponent } from './niveles/usuarios/nivelUser.component';
import { NivelCcComponent } from './niveles/centrosCosto/nivelCc.component';

@NgModule({
	declarations: [
		EscritorioComponent,
		AdminComponent,
		EmpresaComponent,
		EmpresasComponent,
		UsuariosComponent,	
		UsuarioComponent,
		UsuarioAdminComponent,
		NivelesCcComponent,
		NivelCcComponent,
		NivelesUserComponent,
		NivelUserComponent
	],
	exports: [
		EscritorioComponent,
		AdminComponent,
		EmpresaComponent,
		EmpresasComponent,
		NivelesCcComponent,
		NivelCcComponent,
		NivelesUserComponent,
		NivelUserComponent
	],		
	imports: [
		ChartsModule,
		SharedModule,
		AdminRoutingModule,
		ClasificacionModule,
		CommonModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class AdminModule { }
