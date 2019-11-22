import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';

import { EscritorioComponent } from '../escritorio/escritorio.component';

import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresasComponent } from './empresa/empresas.component';
import { UnidadAdminComponent } from '../client/unidadesInternas/unidadesAdmin/unidadAdmin.component';
import { UnidadesAdminComponent } from '../client/unidadesInternas/unidadesAdmin/unidadesAdmin.component';
import { CcostoComponent } from '../client/unidadesInternas/ccosto/ccosto.component';
import { CcostosComponent } from '../client/unidadesInternas/ccosto/ccostos.component';
import { CtrabajoComponent } from '../client/unidadesInternas/ctrabajo/ctrabajo.component';
import { CtrabajosComponent } from '../client/unidadesInternas/ctrabajo/ctrabajos.component';
import { FinalidadComponent } from './classification/clasfFuncionalGasto/finalidad/finalidad.component';
import { FinalidadesComponent } from './classification/clasfFuncionalGasto/finalidad/finalidades.component';
import { FuncionComponent } from './classification/clasfFuncionalGasto/funcion/funcion.component';
import { FuncionesComponent } from './classification/clasfFuncionalGasto/funcion/funciones.component';
import { SubfuncionComponent } from './classification/clasfFuncionalGasto/subfuncion/subfuncion.component';
import { SubfuncionesComponent } from './classification/clasfFuncionalGasto/subfuncion/subfunciones.component';
import { FuentesComponent } from './classification/clasfFuenteFinanciamiento/fuente/fuentes.component';
import { FuenteComponent } from './classification/clasfFuenteFinanciamiento/fuente/fuente.component';
import { SubfuentesComponent } from './classification/clasfFuenteFinanciamiento/subfuente/subfuentes.component';
import { SubfuenteComponent } from './classification/clasfFuenteFinanciamiento/subfuente/subfuente.component';
import { TiposComponent } from './classification/clasfFuenteFinanciamiento/tipo/tipos.component';
import { TipoComponent } from './classification/clasfFuenteFinanciamiento/tipo/tipo.component';

import { EgresosComponent } from '../client/egresos/egresos.component';
// import { ProyectoComponent } from './proyecto/proyecto.component';
import { ProyectosComponent } from '../client/proyectoFases/proyectos/proyectos.component';
import { ProyectoComponent } from '../client/proyectoFases/proyectos/proyecto.component';
import { FasesComponent } from '../client/proyectoFases/fases/fases.component';
import { FaseComponent } from '../client/proyectoFases/fases/fase.component';

const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'escritorio', component: EscritorioComponent },
			{ path: 'pres_egresos', component: EgresosComponent },
			{ path: 'proyectos', component: ProyectosComponent },
			{ path: 'proyecto/:id', component: ProyectoComponent },
			{ path: 'fases', component: FasesComponent },
			{ path: 'fase/:id', component: FaseComponent },

			{ path: 'empresas', component: EmpresasComponent },
			{ path: 'empresa/:id', component: EmpresaComponent },
			{ path: 'unidadesAdmin', component: UnidadesAdminComponent },
			{ path: 'unidadAdmin/:id', component: UnidadAdminComponent },
			{ path: 'ccostos', component: CcostosComponent },
			{ path: 'ccosto/:id', component: CcostoComponent },
			{ path: 'ctrabajos', component: CtrabajosComponent },
			{ path: 'ctrabajo/:id', component: CtrabajoComponent },
			{ path: 'finalidades', component: FinalidadesComponent },
			{ path: 'finalidad/:id', component: FinalidadComponent },
			{ path: 'funciones', component: FuncionesComponent },
			{ path: 'funcion/:id', component: FuncionComponent },
			{ path: 'subfunciones', component: SubfuncionesComponent },
			{ path: 'subfuncion/:id', component: SubfuncionComponent },
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

@NgModule({
	imports: [
		RouterModule.forChild(admin_routes)
	],
	exports: [
		RouterModule
	]
})

export class AdminRoutingModule { }
