import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../../admin.component';

import { GenerosComponent } from './genero/generos.component';
import { GeneroComponent } from './genero/genero.component';
import { GruposComponent } from './grupo/grupos.component';
import { GrupoComponent } from './grupo/grupo.component';
import { RubrosComponent } from './rubro/rubros.component';
import { RubroComponent } from './rubro/rubro.component';
import { CuentasComponent } from './cuenta/cuentas.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { SubcuentasComponent } from './subcuenta/subcuentas.component';
import { SubcuentaComponent } from './subcuenta/subcuenta.component';

const contable_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'generos', component: GenerosComponent },
			{ path: 'generos/:id', component: GeneroComponent },
			{ path: 'grupos', component: GruposComponent },
			{ path: 'grupos/:id', component: GrupoComponent },
			{ path: 'rubros', component: RubrosComponent },
			{ path: 'rubros/:id', component: RubroComponent },
			{ path: 'cuentas', component: CuentasComponent },
			{ path: 'cuentas/:id', component: CuentaComponent },
			{ path: 'subcuentas', component: SubcuentasComponent },
			{ path: 'subcuentas/:id', component: SubcuentaComponent },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
		]
	}
];

export const CLASF_CONTABLE_ROUTES = RouterModule.forChild( contable_routes );
