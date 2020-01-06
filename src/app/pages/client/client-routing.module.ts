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


const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: ClientComponent,
		children: [
			{ path: 'escritorio', component: EscritorioComponent },
			{ path: 'pres_egresos', component: EgresosComponent },
			{ path: 'modificar_egreso', component: CambioEgresoComponent },
			{ path: 'pres_egresos/:id_presupuesto', component: EgresoComponent },
			{ path: 'pres_egresos/:id_presupuesto/proyectos', component: ProyectosComponent },
			{ path: 'pres_egresos/:id_presupuesto/proyectos/:id_proyecto', component: ProyectoComponent },
			{ path: 'pres_egresos/:id_presupuesto/proyectos/:id_proyecto/fases', component: FasesComponent },
			{ path: 'pres_egresos/:id_presupuesto/proyectos/:id_proyecto/fases/:id_fase', component: FaseComponent },

			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' }
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
