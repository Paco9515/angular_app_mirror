import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';

import { EscritorioComponent } from '../escritorio/escritorio.component';

import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresasComponent } from './empresa/empresas.component';
import { LoginComponent } from '../login/login.component';
import { LoginGuard } from '../../common/guards/login.guard';
import { LoginOutGuard } from 'src/app/common/guards/login-out.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { UserGuard } from '../../common/guards/user.guards';


const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'login', component: LoginComponent, canActivate: [LoginOutGuard] },
			{ path: 'escritorio', component: EscritorioComponent, canActivate: [LoginGuard] },

			{ path: 'empresas', component: EmpresasComponent, canActivate: [LoginGuard] },
			{ path: 'empresa/:id', component: EmpresaComponent, canActivate: [LoginGuard] },

			{ path: 'usuarios', component: UsuariosComponent, canActivate: [LoginGuard, UserGuard] },
			{ path: 'usuario/:id', component: UsuarioComponent, canActivate: [LoginGuard, UserGuard] },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio', canActivate: [LoginGuard] },
			//{ path: '', pathMatch: 'full', redirectTo: 'login', canActivate: [LoginOutGuard] },
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(admin_routes)
	],
	exports: [
		RouterModule
	]
})

export class AdminRoutingModule { }
