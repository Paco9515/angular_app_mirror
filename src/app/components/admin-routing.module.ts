import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';

import { EscritorioComponent } from '../pages/escritorio/escritorio.component';
import { ProgramasComponent } from '../pages/admin/classification/clasfProgramatica/programa/programas.component';
import { ProgramaComponent } from '../pages/admin/classification/clasfProgramatica/programa/programa.component';

import { TipoGastosComponent } from '../pages/admin/classification/clasfTipoGasto/tipo-gastos.component';
import { TipoGastoComponent } from '../pages/admin/classification/clasfTipoGasto/tipo-gasto.component';
import { CapitulosComponent } from '../pages/admin/classification/clasfObjetoGasto/capitulo/capitulos.component';
import { CapituloComponent } from '../pages/admin/classification/clasfObjetoGasto/capitulo/capitulo.component';
import { PartidaComponent } from '../pages/admin/classification/clasfObjetoGasto/partida/partida.component';
import { PartidasComponent } from '../pages/admin/classification/clasfObjetoGasto/partida/partidas.component';
import { ConceptosComponent } from '../pages/admin/classification/clasfObjetoGasto/concepto/conceptos.component';
import { ConceptoComponent } from '../pages/admin/classification/clasfObjetoGasto/concepto/concepto.component';
import { GenerosComponent } from '../pages/admin/classification/clasfContable/genero/generos.component';
import { GeneroComponent } from '../pages/admin/classification/clasfContable/genero/genero.component';
import { GruposComponent } from '../pages/admin/classification/clasfContable/grupo/grupos.component';
import { GrupoComponent } from '../pages/admin/classification/clasfContable/grupo/grupo.component';
import { RubrosComponent } from '../pages/admin/classification/clasfContable/rubro/rubros.component';
import { RubroComponent } from '../pages/admin/classification/clasfContable/rubro/rubro.component';
import { CuentasComponent } from '../pages/admin/classification/clasfContable/cuenta/cuentas.component';
import { CuentaComponent } from '../pages/admin/classification/clasfContable/cuenta/cuenta.component';
import { SubcuentasComponent } from '../pages/admin/classification/clasfContable/subcuenta/subcuentas.component';
import { SubcuentaComponent } from '../pages/admin/classification/clasfContable/subcuenta/subcuenta.component';
import { ClasAdministrativasComponent } from '../pages/admin/classification/clasfAdministrativa/administrativa/clas-administrativas.component';
import { ClasAdministrativaComponent } from '../pages/admin/classification/clasfAdministrativa/administrativa/clas-administrativa.component';
import { EconomiasComponent } from '../pages/admin/classification/clasfAdministrativa/economia/economias.component';
import { EconomiaComponent } from '../pages/admin/classification/clasfAdministrativa/economia/economia.component';
import { FinancierosComponent } from '../pages/admin/classification/clasfAdministrativa/financiero/financieros.component';
import { FinancieroComponent } from '../pages/admin/classification/clasfAdministrativa/financiero/financiero.component';
import { SectoresComponent } from '../pages/admin/classification/clasfAdministrativa/sector/sectores.component';
import { SectorComponent } from '../pages/admin/classification/clasfAdministrativa/sector/sector.component';
import { SubeconomiasComponent } from '../pages/admin/classification/clasfAdministrativa/subeconomia/subeconomias.component';
import { SubeconomiaComponent } from '../pages/admin/classification/clasfAdministrativa/subeconomia/subeconomia.component';

import { EmpresaComponent } from '../pages/admin/empresa/empresa.component';
import { EmpresasComponent } from '../pages/admin/empresa/empresas.component';
import { UnidadAdminComponent } from '../pages/client/unidadesInternas/unidadesAdmin/unidadAdmin.component';
import { UnidadesAdminComponent } from '../pages/client/unidadesInternas/unidadesAdmin/unidadesAdmin.component';
import { CcostoComponent } from '../pages/client/unidadesInternas/ccosto/ccosto.component';
import { CcostosComponent } from '../pages/client/unidadesInternas/ccosto/ccostos.component';
import { CtrabajoComponent } from '../pages/client/unidadesInternas/ctrabajo/ctrabajo.component';
import { CtrabajosComponent } from '../pages/client/unidadesInternas/ctrabajo/ctrabajos.component';
import { FinalidadComponent } from '../pages/admin/classification/clasfFuncionalGasto/finalidad/finalidad.component';
import { FinalidadesComponent } from '../pages/admin/classification/clasfFuncionalGasto/finalidad/finalidades.component';
import { FuncionComponent } from '../pages/admin/classification/clasfFuncionalGasto/funcion/funcion.component';
import { FuncionesComponent } from '../pages/admin/classification/clasfFuncionalGasto/funcion/funciones.component';
import { SubfuncionComponent } from '../pages/admin/classification/clasfFuncionalGasto/subfuncion/subfuncion.component';
import { SubfuncionesComponent } from '../pages/admin/classification/clasfFuncionalGasto/subfuncion/subfunciones.component';
import { FuentesComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/fuente/fuentes.component';
import { FuenteComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/fuente/fuente.component';
import { SubfuentesComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/subfuente/subfuentes.component';
import { SubfuenteComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/subfuente/subfuente.component';
import { TiposComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/tipo/tipos.component';
import { TipoComponent } from '../pages/admin/classification/clasfFuenteFinanciamiento/tipo/tipo.component';
import { SubprogramasComponent } from '../pages/admin/classification/clasfProgramatica/subprograma/subprogramas.component';
import { SubprogramaComponent } from '../pages/admin/classification/clasfProgramatica/subprograma/subprograma.component';
import { EgresosComponent } from '../pages/client/egresos/egresos.component';
// import { ProyectoComponent } from './proyecto/proyecto.component';
import { ProyectosComponent } from '../pages/client/proyectoFases/proyectos/proyectos.component';
import { ProyectoComponent } from '../pages/client/proyectoFases/proyectos/proyecto.component';
import { FasesComponent } from '../pages/client/proyectoFases/fases/fases.component';
import { FaseComponent } from '../pages/client/proyectoFases/fases/fase.component';

const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'programas', component: ProgramasComponent },
			{ path: 'escritorio', component: EscritorioComponent },
			{ path: 'programa/:id', component: ProgramaComponent },
			{ path: 'subprogramas', component: SubprogramasComponent },
			{ path: 'subprograma/:id', component: SubprogramaComponent },
			{ path: 'pres_egresos', component: EgresosComponent },
			{ path: 'proyectos', component: ProyectosComponent },
			{ path: 'proyecto/:id', component: ProyectoComponent },
			{ path: 'fases', component: FasesComponent },
			{ path: 'fase/:id', component: FaseComponent },

			{ path: 'tipos-gastos', component: TipoGastosComponent },
			{ path: 'tipos-gastos/:id', component: TipoGastoComponent },
			{ path: 'capitulos', component: CapitulosComponent },
			{ path: 'capitulos/:id', component: CapituloComponent },
			{ path: 'conceptos', component: ConceptosComponent },
			{ path: 'conceptos/:id', component: ConceptoComponent },
			{ path: 'partidas', component: PartidasComponent },
			{ path: 'partidas/:id', component: PartidaComponent },
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
	imports: [RouterModule.forChild(admin_routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
