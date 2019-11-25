import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ClientComponent } from './client.component';

import { EscritorioComponent } from '../escritorio/escritorio.component';
import { EgresosComponent } from './egresos/egresos.component';



const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: ClientComponent,
		children: [
			{ path: 'escritorio', component: EscritorioComponent },
			{ path: 'pres_egresos', component: EgresosComponent },

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

export class ClientRoutingModule { }
