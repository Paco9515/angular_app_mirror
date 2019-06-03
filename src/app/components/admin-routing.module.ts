import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { ProgramasComponent } from './cp/programa/programas.component';
import { EscritorioComponent } from './escritorio/escritorio.component';
import { ProgramaComponent } from './cp/programa/programa.component';
import { ProgressComponent } from './progress/progress.component';


import { CapitulosComponent } from './cog/capitulo/capitulos.component';
import { CapituloComponent } from './cog/capitulo/capitulo.component';
import { PartidaComponent } from './cog/partida/partida.component';
import { PartidasComponent } from './cog/partida/partidas.component';
import { ConceptosComponent } from './cog/concepto/conceptos.component';
import { ConceptoComponent } from './cog/concepto/concepto.component';
import { GenerosComponent } from './cc/genero/generos.component';
import { GruposComponent } from './cc/grupo/grupos.component';
import { RubrosComponent } from './cc/rubro/rubros.component';
import { CuentasComponent } from './cc/cuenta/cuentas.component';
import { SubcuentasComponent } from './cc/subcuenta/subcuentas.component';
import { ClasAdministrativasComponent } from './ca/clas-administrativas/clas-administrativas.component';
import { ClasAdministrativaComponent } from './ca/clas-administrativas/clas-administrativa.component';
import { EconomiasComponent } from './ca/economia/economias.component';
import { FinancierosComponent } from './ca/financiero/financieros.component';
import { SectoresComponent } from './ca/sector/sectores.component';
import { SubeconomiasComponent } from './ca/subeconomia/subeconomias.component';

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
import { SubfuentesComponent } from './cff/subfuente/subfuentes.component';
import { TiposComponent } from './cff/tipo/tipos.component';

const admin_routes: Routes = [
	{
		path: 'panel-adm',
		component: AdminComponent,
		children: [
			{ path: 'programas', component: ProgramasComponent },
			{ path: 'progress', component: ProgressComponent },
			{ path: 'escritorio', component: EscritorioComponent },
			{ path: 'programa/:id', component: ProgramaComponent },

			{ path: 'capitulos', component: CapitulosComponent },
			{ path: 'capitulos/:id', component: CapituloComponent },
			{ path: 'conceptos', component: ConceptosComponent },
			{ path: 'conceptos/id', component: ConceptoComponent },
			{ path: 'partidas', component: PartidasComponent },
			{ path: 'partida/:id', component: PartidaComponent },
			{ path: 'generos', component: GenerosComponent },
			{ path: 'generos/:id', component: PartidaComponent },
			{ path: 'grupos', component: GruposComponent },
			{ path: 'grupos/:id', component: PartidaComponent },
			{ path: 'rubros', component: RubrosComponent },
			{ path: 'rubros/:id', component: PartidaComponent },
			{ path: 'cuentas', component: CuentasComponent },
			{ path: 'cuentas/:id', component: PartidaComponent },
			{ path: 'subcuentas', component: SubcuentasComponent },
			{ path: 'subcuentas/:id', component: PartidaComponent },
			{ path: 'administrativas', component: ClasAdministrativasComponent },
			{ path: 'administrativas/:id', component: ClasAdministrativaComponent },
			{ path: 'economias', component: EconomiasComponent },
			{ path: 'financieros', component: FinancierosComponent },
			{ path: 'sectores', component: SectoresComponent },
			{ path: 'subeconomias', component: SubeconomiasComponent },
			{ path: '', pathMatch: 'full', redirectTo: 'escritorio' },

			{ path: 'empresas', component: EmpresasComponent },
			{ path: 'empresa/:id', component: EmpresaComponent },
			{ path: 'unidadesAdmin', component: UnidadesAdminComponent },
			{ path: 'ccostos', component: CcostosComponent },
			{ path: 'ctrabajos', component: CtrabajosComponent },
			{ path: 'finalidades', component: FinalidadesComponent },
			{ path: 'funciones', component: FuncionesComponent },
			{ path: 'subfunciones', component: SubfuncionesComponent },
			{ path: 'fuentes', component: FuentesComponent },
			{ path: 'subfuentes', component: SubfuentesComponent },
			{ path: 'tipos', component: TiposComponent },

		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(admin_routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
