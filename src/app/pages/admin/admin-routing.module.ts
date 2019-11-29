import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';

import { EscritorioComponent } from '../escritorio/escritorio.component';

import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresasComponent } from './empresa/empresas.component';


const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'escritorio', component: EscritorioComponent },

			{ path: 'empresas', component: EmpresasComponent },
			{ path: 'empresa/:id', component: EmpresaComponent },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
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