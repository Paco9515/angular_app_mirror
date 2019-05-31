import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EscritorioComponent } from './components/escritorio/escritorio.component';
import { ProgramasComponent } from './components/cp/programa/programas.component';
import { ProgramaComponent } from './components/cp/programa/programa.component';
import { CapitulosComponent } from './components/cog/capitulo/capitulos.component';
import { CapituloComponent } from './components/cog/capitulo/capitulo.component';
import { PartidaComponent } from './components/cog/partida/partida.component';
import { PartidasComponent } from './components/cog/partida/partidas.component';
import { ConceptosComponent } from './components/cog/concepto/conceptos.component';
import { ConceptoComponent } from './components/cog/concepto/concepto.component';
import { GenerosComponent } from './components/cc/genero/generos.component';
import { GruposComponent } from './components/cc/grupo/grupos.component';
import { RubrosComponent } from './components/cc/rubro/rubros.component';
import { CuentasComponent } from './components/cc/cuenta/cuentas.component';
import { SubcuentasComponent } from './components/cc/subcuenta/subcuentas.component';
import { ClasAdministrativasComponent } from './components/ca/clas-administrativas/clas-administrativas.component';
import { ClasAdministrativaComponent } from './components/ca/clas-administrativas/clas-administrativa.component';
import { EconomiasComponent } from './components/ca/economia/economias.component';
import { FinancierosComponent } from './components/ca/financiero/financieros.component';
import { SectoresComponent } from './components/ca/sector/sectores.component';
import { SubeconomiasComponent } from './components/ca/subeconomia/subeconomias.component';

const routes: Routes = [
	{ path: 'panel-adm', component: EscritorioComponent },
	{ path: 'panel-adm/programas', component: ProgramasComponent },
	{ path: 'panel-adm/programas/:id', component: ProgramaComponent },
	{ path: 'panel-adm/capitulos', component: CapitulosComponent },
	{ path: 'panel-adm/capitulos/:id', component: CapituloComponent },
	{ path: 'panel-adm/conceptos', component: ConceptosComponent },
	{ path: 'panel-adm/conceptos/id', component: ConceptoComponent },
	{ path: 'panel-adm/partidas', component: PartidasComponent },
	{ path: 'panel-adm/partida/:id', component: PartidaComponent },
	{ path: 'panel-adm/generos', component: GenerosComponent },
	{ path: 'panel-adm/generos/:id', component: PartidaComponent },
	{ path: 'panel-adm/grupos', component: GruposComponent },
	{ path: 'panel-adm/grupos/:id', component: PartidaComponent },
	{ path: 'panel-adm/rubros', component: RubrosComponent },
	{ path: 'panel-adm/rubros/:id', component: PartidaComponent },
	{ path: 'panel-adm/cuentas', component: CuentasComponent },
	{ path: 'panel-adm/cuentas/:id', component: PartidaComponent },
	{ path: 'panel-adm/subcuentas', component: SubcuentasComponent },
	{ path: 'panel-adm/subcuentas/:id', component: PartidaComponent },
	{ path: 'panel-adm/administrativas', component: ClasAdministrativasComponent },
	{ path: 'panel-adm/administrativas/:id', component: ClasAdministrativaComponent },
	{ path: 'panel-adm/economias', component: EconomiasComponent },
	{ path: 'panel-adm/financieros', component: FinancierosComponent },
	{ path: 'panel-adm/sectores', component: SectoresComponent },
	{ path: 'panel-adm/subeconomias', component: SubeconomiasComponent },

	{ path: '', pathMatch: 'full', redirectTo: 'panel-adm' },
	{ path: '**', pathMatch: 'full', redirectTo: 'panel-adm' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
