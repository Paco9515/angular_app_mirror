import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../../admin.component';
import { FinalidadesComponent } from './finalidad/finalidades.component';
import { FinalidadComponent } from './finalidad/finalidad.component';
import { FuncionesComponent } from './funcion/funciones.component';
import { FuncionComponent } from './funcion/funcion.component';
import { SubfuncionesComponent } from './subfuncion/subfunciones.component';
import { SubfuncionComponent } from './subfuncion/subfuncion.component';



const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'finalidades', component: FinalidadesComponent },
			{ path: 'finalidad/:id', component: FinalidadComponent },
			{ path: 'funciones', component: FuncionesComponent },
			{ path: 'funcion/:id', component: FuncionComponent },
			{ path: 'subfunciones', component: SubfuncionesComponent },
			{ path: 'subfuncion/:id', component: SubfuncionComponent },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
		]
	}
];

export const CLASF_FUNCIONAL_GASTO_ROUTES = RouterModule.forChild( admin_routes );
