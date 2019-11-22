import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../../admin.component';

import { ClasAdministrativasComponent } from '../clasfAdministrativa/administrativa/clas-administrativas.component';
import { ClasAdministrativaComponent } from '../clasfAdministrativa/administrativa/clas-administrativa.component';
import { EconomiasComponent } from '../clasfAdministrativa/economia/economias.component';
import { EconomiaComponent } from '../clasfAdministrativa/economia/economia.component';
import { FinancierosComponent } from '../clasfAdministrativa/financiero/financieros.component';
import { FinancieroComponent } from '../clasfAdministrativa/financiero/financiero.component';
import { SectoresComponent } from '../clasfAdministrativa/sector/sectores.component';
import { SectorComponent } from '../clasfAdministrativa/sector/sector.component';
import { SubeconomiasComponent } from '../clasfAdministrativa/subeconomia/subeconomias.component';
import { SubeconomiaComponent } from '../clasfAdministrativa/subeconomia/subeconomia.component';

const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'administrativas', component: ClasAdministrativasComponent },
			{ path: 'administrativas/:id', component: ClasAdministrativaComponent },
			{ path: 'economias', component: EconomiasComponent },
			{ path: 'economias/:id', component: EconomiaComponent },
			{ path: 'financieros', component: FinancierosComponent },
			{ path: 'financieros/:id', component: FinancieroComponent },
			{ path: 'sectores', component: SectoresComponent },
			{ path: 'sectores/:id', component: SectorComponent },
			{ path: 'subeconomias', component: SubeconomiasComponent },
			{ path: 'subeconomias/:id', component: SubeconomiaComponent },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
		]
	}
];

export const CLASF_ADMINITRACION_ROUTES = RouterModule.forChild( admin_routes );
