import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';

import { EscritorioComponent } from '../pages/escritorio/escritorio.component';
import { ProgramasComponent } from '../pages/admin/classification/cp/programa/programas.component';
import { ProgramaComponent } from '../pages/admin/classification/cp/programa/programa.component';

import { TipoGastosComponent } from '../pages/admin/classification/clasfTipoGasto/tipo-gastos.component';
import { TipoGastoComponent } from '../pages/admin/classification/clasfTipoGasto/tipo-gasto.component';
import { CapitulosComponent } from '../pages/admin/classification/cog/capitulo/capitulos.component';
import { CapituloComponent } from '../pages/admin/classification/cog/capitulo/capitulo.component';
import { PartidaComponent } from '../pages/admin/classification/cog/partida/partida.component';
import { PartidasComponent } from '../pages/admin/classification/cog/partida/partidas.component';
import { ConceptosComponent } from '../pages/admin/classification/cog/concepto/conceptos.component';
import { ConceptoComponent } from '../pages/admin/classification/cog/concepto/concepto.component';
import { GenerosComponent } from '../pages/admin/classification/cc/genero/generos.component';
import { GeneroComponent } from '../pages/admin/classification/cc/genero/genero.component';
import { GruposComponent } from '../pages/admin/classification/cc/grupo/grupos.component';
import { GrupoComponent } from '../pages/admin/classification/cc/grupo/grupo.component';
import { RubrosComponent } from '../pages/admin/classification/cc/rubro/rubros.component';
import { RubroComponent } from '../pages/admin/classification/cc/rubro/rubro.component';
import { CuentasComponent } from '../pages/admin/classification/cc/cuenta/cuentas.component';
import { CuentaComponent } from '../pages/admin/classification/cc/cuenta/cuenta.component';
import { SubcuentasComponent } from '../pages/admin/classification/cc/subcuenta/subcuentas.component';
import { SubcuentaComponent } from '../pages/admin/classification/cc/subcuenta/subcuenta.component';
import { ClasAdministrativasComponent } from '../pages/admin/classification/ca/clas-administrativas/clas-administrativas.component';
import { ClasAdministrativaComponent } from '../pages/admin/classification/ca/clas-administrativas/clas-administrativa.component';
import { EconomiasComponent } from '../pages/admin/classification/ca/economia/economias.component';
import { EconomiaComponent } from '../pages/admin/classification/ca/economia/economia.component';
import { FinancierosComponent } from '../pages/admin/classification/ca/financiero/financieros.component';
import { FinancieroComponent } from '../pages/admin/classification/ca/financiero/financiero.component';
import { SectoresComponent } from '../pages/admin/classification/ca/sector/sectores.component';
import { SectorComponent } from '../pages/admin/classification/ca/sector/sector.component';
import { SubeconomiasComponent } from '../pages/admin/classification/ca/subeconomia/subeconomias.component';
import { SubeconomiaComponent } from '../pages/admin/classification/ca/subeconomia/subeconomia.component';

import { EmpresaComponent } from '../pages/admin/empresa/empresa.component';
import { EmpresasComponent } from '../pages/admin/empresa/empresas.component';
import { UnidadAdminComponent } from '../pages/client/ui/unidadesAdmin/unidadAdmin.component';
import { UnidadesAdminComponent } from '../pages/client/ui/unidadesAdmin/unidadesAdmin.component';
import { CcostoComponent } from '../pages/client/ui/ccosto/ccosto.component';
import { CcostosComponent } from '../pages/client/ui/ccosto/ccostos.component';
import { CtrabajoComponent } from '../pages/client/ui/ctrabajo/ctrabajo.component';
import { CtrabajosComponent } from '../pages/client/ui/ctrabajo/ctrabajos.component';
import { FinalidadComponent } from '../pages/admin/classification/cfg/finalidad/finalidad.component';
import { FinalidadesComponent } from '../pages/admin/classification/cfg/finalidad/finalidades.component';
import { FuncionComponent } from '../pages/admin/classification/cfg/funcion/funcion.component';
import { FuncionesComponent } from '../pages/admin/classification/cfg/funcion/funciones.component';
import { SubfuncionComponent } from '../pages/admin/classification/cfg/subfuncion/subfuncion.component';
import { SubfuncionesComponent } from '../pages/admin/classification/cfg/subfuncion/subfunciones.component';
import { FuentesComponent } from '../pages/admin/classification/cff/fuente/fuentes.component';
import { FuenteComponent } from '../pages/admin/classification/cff/fuente/fuente.component';
import { SubfuentesComponent } from '../pages/admin/classification/cff/subfuente/subfuentes.component';
import { SubfuenteComponent } from '../pages/admin/classification/cff/subfuente/subfuente.component';
import { TiposComponent } from '../pages/admin/classification/cff/tipo/tipos.component';
import { TipoComponent } from '../pages/admin/classification/cff/tipo/tipo.component';
import { SubprogramasComponent } from '../pages/admin/classification/cp/subprograma/subprogramas.component';
import { SubprogramaComponent } from '../pages/admin/classification/cp/subprograma/subprograma.component';
import { EgresosComponent } from '../pages/client/egresos/egresos.component';
// import { ProyectoComponent } from './proyecto/proyecto.component';
import { ProyectosComponent } from '../pages/client/pe/proyectos/proyectos.component';
import { ProyectoComponent } from '../pages/client/pe/proyectos/proyecto.component';
import { FasesComponent } from '../pages/client/pe/fases/fases.component';
import { FaseComponent } from '../pages/client/pe/fases/fase.component';

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
