import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../../admin.component';

import { CapitulosComponent } from './capitulo/capitulos.component';
import { CapituloComponent } from './capitulo/capitulo.component';
import { PartidaComponent } from './partida/partida.component';
import { PartidasComponent } from './partida/partidas.component';
import { ConceptosComponent } from './concepto/conceptos.component';
import { ConceptoComponent } from './concepto/concepto.component';
import { TipoGastosComponent } from './tipoGasto/tipo-gastos.component';
import { TipoGastoComponent } from './tipoGasto/tipo-gasto.component';

const obj_gasto_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'capitulos', component: CapitulosComponent },
			{ path: 'capitulos/:id', component: CapituloComponent },
			{ path: 'conceptos', component: ConceptosComponent },
			{ path: 'conceptos/:id', component: ConceptoComponent },
			{ path: 'partidas', component: PartidasComponent },
			{ path: 'partidas/:id', component: PartidaComponent },
			{ path: 'tipos-gastos', component: TipoGastosComponent },
			{ path: 'tipos-gastos/:id', component: TipoGastoComponent },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
		]
	}
];

export const CLASF_OBJETO_GASTO_ROUTES = RouterModule.forChild( obj_gasto_routes );
