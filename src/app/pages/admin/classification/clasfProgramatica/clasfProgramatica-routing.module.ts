import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../../admin.component';

import { ProgramasComponent } from './programa/programas.component';
import { ProgramaComponent } from './programa/programa.component';
import { SubprogramasComponent } from './subprograma/subprogramas.component';
import { SubprogramaComponent } from './subprograma/subprograma.component';

const programatica_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'programas', component: ProgramasComponent },
			{ path: 'programa/:id', component: ProgramaComponent },
			{ path: 'subprogramas', component: SubprogramasComponent },
			{ path: 'subprograma/:id', component: SubprogramaComponent },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
		]
	}
];

export const CLASF_PROGRAMATICA_ROUTES = RouterModule.forChild( programatica_routes );
