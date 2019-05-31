import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { ProgramasComponent } from './cp/programa/programas.component';
import { EscritorioComponent } from './escritorio/escritorio.component';
import { ProgramaComponent } from './cp/programa/programa.component';
import { ProgressComponent } from './progress/progress.component';

const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'programas', component: ProgramasComponent },
			{ path: 'progress', component: ProgressComponent },
			{ path: 'escritorio', component: EscritorioComponent },
			{ path: 'programa/:id', component: ProgramaComponent },
			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(admin_routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
