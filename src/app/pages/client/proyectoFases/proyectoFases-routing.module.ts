import { Routes, RouterModule } from '@angular/router';

// import { ClientComponent } from '../client.component';
import { FasesComponent } from './fases/fases.component';
import { FaseComponent } from './fases/fase.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoComponent } from './proyectos/proyecto.component';



const admin_routes: Routes = [
	{
		path: 'panel-adm',
		// component: ClientComponent,
		children: [
			{ path: 'fases', component: FasesComponent },
			{ path: 'fase/:id', component: FaseComponent },
			{ path: 'proyectos', component: ProyectosComponent },
			{ path: 'proyecto/:id', component: ProyectoComponent },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
		]
	}
];

export const PROYECTO_FASES_ROUTES = RouterModule.forChild( admin_routes );
