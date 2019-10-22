import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';

import { EscritorioComponent } from './escritorio/escritorio.component';
import { ProgramasComponent } from './cp/programa/programas.component';
import { ProgramaComponent } from './cp/programa/programa.component';
import { ProgressComponent } from './progress/progress.component';

import { TipoGastosComponent } from './ctg/tipo-gasto/tipo-gastos.component';
import { TipoGastoComponent } from './ctg/tipo-gasto/tipo-gasto.component';
import { CapitulosComponent } from './cog/capitulo/capitulos.component';
import { CapituloComponent } from './cog/capitulo/capitulo.component';
import { PartidaComponent } from './cog/partida/partida.component';
import { PartidasComponent } from './cog/partida/partidas.component';
import { ConceptosComponent } from './cog/concepto/conceptos.component';
import { ConceptoComponent } from './cog/concepto/concepto.component';
import { GenerosComponent } from './cc/genero/generos.component';
import { GeneroComponent } from './cc/genero/genero.component';
import { GruposComponent } from './cc/grupo/grupos.component';
import { GrupoComponent } from './cc/grupo/grupo.component';
import { RubrosComponent } from './cc/rubro/rubros.component';
import { RubroComponent } from './cc/rubro/rubro.component';
import { CuentasComponent } from './cc/cuenta/cuentas.component';
import { CuentaComponent } from './cc/cuenta/cuenta.component';
import { SubcuentasComponent } from './cc/subcuenta/subcuentas.component';
import { SubcuentaComponent } from './cc/subcuenta/subcuenta.component';
import { ClasAdministrativasComponent } from './ca/clas-administrativas/clas-administrativas.component';
import { ClasAdministrativaComponent } from './ca/clas-administrativas/clas-administrativa.component';
import { EconomiasComponent } from './ca/economia/economias.component';
import { EconomiaComponent } from './ca/economia/economia.component';
import { FinancierosComponent } from './ca/financiero/financieros.component';
import { FinancieroComponent } from './ca/financiero/financiero.component';
import { SectoresComponent } from './ca/sector/sectores.component';
import { SectorComponent } from './ca/sector/sector.component';
import { SubeconomiasComponent } from './ca/subeconomia/subeconomias.component';
import { SubeconomiaComponent } from './ca/subeconomia/subeconomia.component';

import { EmpresaComponent } from './ui/empresa/empresa.component';
import { EmpresasComponent } from './ui/empresa/empresas.component';
import { UnidadAdminComponent } from './ui/unidadesAdmin/unidadAdmin.component';
import { UnidadesAdminComponent } from './ui/unidadesAdmin/unidadesAdmin.component';
import { CcostoComponent } from './ui/ccosto/ccosto.component';
import { CcostosComponent } from './ui/ccosto/ccostos.component';
import { CtrabajoComponent } from './ui/ctrabajo/ctrabajo.component';
import { CtrabajosComponent } from './ui/ctrabajo/ctrabajos.component';
import { FinalidadComponent } from './cfg/finalidad/finalidad.component';
import { FinalidadesComponent } from './cfg/finalidad/finalidades.component';
import { FuncionComponent } from './cfg/funcion/funcion.component';
import { FuncionesComponent } from './cfg/funcion/funciones.component';
import { SubfuncionComponent } from './cfg/subfuncion/subfuncion.component';
import { SubfuncionesComponent } from './cfg/subfuncion/subfunciones.component';
import { FuentesComponent } from './cff/fuente/fuentes.component';
import { FuenteComponent } from './cff/fuente/fuente.component';
import { SubfuentesComponent } from './cff/subfuente/subfuentes.component';
import { SubfuenteComponent } from './cff/subfuente/subfuente.component';
import { TiposComponent } from './cff/tipo/tipos.component';
import { TipoComponent } from './cff/tipo/tipo.component';
import { PromesasComponent } from './promesas/promesas.component';
import { SubprogramasComponent } from './cp/subprograma/subprogramas.component';
import { SubprogramaComponent } from './cp/subprograma/subprograma.component';
import { EgresosComponent } from './egresos/egresos.component';
// import { ProyectoComponent } from './proyecto/proyecto.component';
import { ProyectosComponent } from './pe/proyectos/proyectos.component';
import { ProyectoComponent } from './pe/proyectos/proyecto.component';
import { FasesComponent } from './pe/fases/fases.component';
import { FaseComponent } from './pe/fases/fase.component';

const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'programas', component: ProgramasComponent },
			{ path: 'progress', component: ProgressComponent },
			{ path: 'escritorio', component: EscritorioComponent },
			{ path: 'promesas', component: PromesasComponent },
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
