import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ClientComponent } from './client.component';

import { EscritorioComponent } from '../escritorio/escritorio.component';
import { EgresosComponent } from './egresos/egresos.component';
import { FasesComponent } from './proyectoFases/fases/fases.component';
import { FaseComponent } from './proyectoFases/fases/fase.component';
import { ProyectosComponent } from './proyectoFases/proyectos/proyectos.component';
import { ProyectoComponent } from './proyectoFases/proyectos/proyecto.component';
import { CambioEgresoComponent } from './egresos/cambioEgreso/cambioEgreso.component';
import { EgresoComponent } from './egresos/egreso.component';
import { LoginComponent } from '../login/login.component';
import { LoginGuard } from '../../common/guards/login.guard';
import { LoginOutGuard } from 'src/app/common/guards/login-out.guard';
import { PerfilComponent} from './perfil/perfil.component';


const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: ClientComponent,
		children: [
			{ path: 'login', component: LoginComponent, canActivate: [LoginOutGuard] },
			{ path: 'escritorio', component: EscritorioComponent, canActivate: [LoginGuard] },
			{ path: 'pres_egresos', component: EgresosComponent, canActivate: [LoginGuard] },
			{ path: 'modificar_egreso', component: CambioEgresoComponent, canActivate: [LoginGuard] },
			{ path: 'pres_egresos/:id_presupuesto', component: EgresoComponent, canActivate: [LoginGuard] },
			{ path: 'pres_egresos/:id_presupuesto/proyectos', component: ProyectosComponent, canActivate: [LoginGuard] },
			{ path: 'pres_egresos/:id_presupuesto/proyectos/:id_proyecto', component: ProyectoComponent, canActivate: [LoginGuard] },
			{ path: 'pres_egresos/:id_presupuesto/proyectos/:id_proyecto/fases', component: FasesComponent, canActivate: [LoginGuard] },
			{ path: 'pres_egresos/:id_presupuesto/proyectos/:id_proyecto/fases/:id_fase', component: FaseComponent, canActivate: [LoginGuard] },

			{ path: 'mod_proyectos/:id_presupuesto/proyectos/:bandera', component: ProyectosComponent, canActivate: [LoginGuard] },
			{ path: 'mod_proyecto/:id_presupuesto/proyectos/:id_proyecto/:bandera', component: ProyectoComponent, canActivate: [LoginGuard] },
			{ path: 'mod_fases/:id_presupuesto/proyectos/:id_proyecto/fases/:bandera', component: FasesComponent, canActivate: [LoginGuard] },
			{ path: 'mod_fase/:id_presupuesto/proyectos/:id_proyecto/fases/:id_fase/:bandera', component: FaseComponent, canActivate: [LoginGuard] },

			{ path: 'perfil', component: PerfilComponent, canActivate: [LoginGuard] },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio', canActivate: [LoginGuard] }
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
