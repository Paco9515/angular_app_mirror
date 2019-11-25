import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../../admin.component';
import { FuentesComponent } from './fuente/fuentes.component';
import { FuenteComponent } from './fuente/fuente.component';
import { SubfuentesComponent } from './subfuente/subfuentes.component';
import { SubfuenteComponent } from './subfuente/subfuente.component';
import { TiposComponent } from './tipo/tipos.component';
import { TipoComponent } from './tipo/tipo.component';



const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'fuentes', component: FuentesComponent },
			{ path: 'fuente/:id', component: FuenteComponent },
			{ path: 'subfuentes', component: SubfuentesComponent },
			{ path: 'subfuente/:id', component: SubfuenteComponent },
			{ path: 'tipos', component: TiposComponent },
			{ path: 'tipo/:id', component: TipoComponent },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
		]
	}
];

export const CLASF_FFINANCIAMIENTO_ROUTES = RouterModule.forChild( admin_routes );
