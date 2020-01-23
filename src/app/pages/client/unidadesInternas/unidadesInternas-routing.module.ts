import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from '../client.component';
import { CcostosComponent } from './ccosto/ccostos.component';
import { CcostoComponent } from './ccosto/ccosto.component';
import { CtrabajoComponent } from './ctrabajo/ctrabajo.component';
import { CtrabajosComponent } from './ctrabajo/ctrabajos.component';
import { UnidadAdminComponent } from './unidadesAdmin/unidadAdmin.component';
import { UnidadesAdminComponent } from './unidadesAdmin/unidadesAdmin.component';

const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: ClientComponent,
		children: [
			{ path: 'ccostos', component: CcostosComponent },
			{ path: 'ccosto/:id', component: CcostoComponent },
			{ path: 'ctrabajos', component: CtrabajosComponent },
			{ path: 'ctrabajo/:id', component: CtrabajoComponent },
			{ path: 'unidadesAdmin', component: UnidadesAdminComponent },
			{ path: 'unidadAdmin/:id', component: UnidadAdminComponent },
			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
		]
	}
];

export const UINIDADES_ADMINISTRATIVAS_ROUTES = RouterModule.forChild( admin_routes );
