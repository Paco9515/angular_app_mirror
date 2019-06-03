import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { ProgramasComponent } from './cp/programa/programas.component';
import { ProgramaComponent } from './cp/programa/programa.component';
import { EscritorioComponent } from './escritorio/escritorio.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
// import { ChartsModule } from 'node_modules/ng2-charts';
// import { ChartsModule } from 'ng2-charts';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProgressComponent } from './progress/progress.component';
import { IncrementadorComponent } from '../reusable/incrementador/incrementador.component';


//Cristina
import { CapitulosComponent } from './cog/capitulo/capitulos.component';
import { CapituloComponent } from './cog/capitulo/capitulo.component';
import { ConceptoComponent } from './cog/concepto/concepto.component';
import { PartidaComponent } from './cog/partida/partida.component';
import { ConceptosComponent } from './cog/concepto/conceptos.component';
import { PartidasComponent } from './cog/partida/partidas.component';
import { GeneroComponent } from './cc/genero/genero.component';
import { GenerosComponent } from './cc/genero/generos.component';
import { GrupoComponent } from './cc/grupo/grupo.component';
import { GruposComponent } from './cc/grupo/grupos.component';
import { RubroComponent } from './cc/rubro/rubro.component';
import { RubrosComponent } from './cc/rubro/rubros.component';
import { CuentaComponent } from './cc/cuenta/cuenta.component';
import { CuentasComponent } from './cc/cuenta/cuentas.component';
import { SubcuentaComponent } from './cc/subcuenta/subcuenta.component';
import { SubcuentasComponent } from './cc/subcuenta/subcuentas.component';
import { SectorComponent } from './ca/sector/sector.component';
import { SectoresComponent } from './ca/sector/sectores.component';
import { FinancieroComponent } from './ca/financiero/financiero.component';
import { FinancierosComponent } from './ca/financiero/financieros.component';
import { EconomiaComponent } from './ca/economia/economia.component';
import { EconomiasComponent } from './ca/economia/economias.component';
import { ClasAdministrativasComponent } from './ca/clas-administrativas/clas-administrativas.component';
import { ClasAdministrativaComponent } from './ca/clas-administrativas/clas-administrativa.component';
import { SubeconomiaComponent } from './ca/subeconomia/subeconomia.component';
import { SubeconomiasComponent } from './ca/subeconomia/subeconomias.component';

import { CcostoComponent } from './ui/ccosto/ccosto.component';
import { CcostosComponent } from './ui/ccosto/ccostos.component';
import { EmpresaComponent } from './ui/empresa/empresa.component';
import { EmpresasComponent } from './ui/empresa/empresas.component';
import { UnidadesAdminComponent } from './ui/unidadesAdmin/unidadesAdmin.component';
import { UnidadAdminComponent } from './ui/unidadesAdmin/unidadAdmin.component';
import { CtrabajosComponent } from './ui/ctrabajo/ctrabajos.component';
import { CtrabajoComponent } from './ui/ctrabajo/ctrabajo.component';
import { FinalidadesComponent } from './cfg/finalidad/finalidades.component';
import { FinalidadComponent } from './cfg/finalidad/finalidad.component';
import { FuncionComponent } from './cfg/funcion/funcion.component';
import { FuncionesComponent } from './cfg/funcion/funciones.component';
import { SubfuncionComponent } from './cfg/subfuncion/subfuncion.component';
import { SubfuncionesComponent } from './cfg/subfuncion/subfunciones.component';
import { FuentesComponent } from './cff/fuente/fuentes.component';
import { SubfuentesComponent } from './cff/subfuente/subfuentes.component';
import { TiposComponent } from './cff/tipo/tipos.component';

@NgModule({
	declarations: [
		ProgramasComponent,
		EscritorioComponent,
		ProgramaComponent,
		AdminComponent,
		ProgressComponent,
		IncrementadorComponent,

		CapitulosComponent,
		CapituloComponent,
		ConceptoComponent,
		PartidaComponent,
		ConceptosComponent,
		PartidasComponent,
		GeneroComponent,
		GenerosComponent,
		GrupoComponent,
		GruposComponent,
		RubroComponent,
		RubrosComponent,
		CuentaComponent,
		CuentasComponent,
		SubcuentaComponent,
		SubcuentasComponent,
		SectorComponent,
		SectoresComponent,
		FinancieroComponent,
		FinancierosComponent,
		EconomiaComponent,
		EconomiasComponent,
		ClasAdministrativasComponent,
		ClasAdministrativaComponent,
		SubeconomiaComponent,
		SubeconomiasComponent,

		EmpresaComponent,
		EmpresasComponent,
		UnidadesAdminComponent,
		UnidadAdminComponent,
		CcostoComponent,
		CcostosComponent,
		CtrabajosComponent,
		CtrabajoComponent,
		FinalidadesComponent,
		FinalidadComponent,
		FuncionComponent,
		FuncionesComponent,
		SubfuncionComponent,
		SubfuncionesComponent,
		FuentesComponent,
		SubfuentesComponent,
		TiposComponent
	],
	exports: [
		ProgramasComponent,
		EscritorioComponent,
		ProgramaComponent,
		AdminComponent,
		ProgressComponent,

		CapitulosComponent,
		CapituloComponent,
		ConceptoComponent,
		PartidaComponent,
		ConceptosComponent,
		PartidasComponent,
		GeneroComponent,
		GenerosComponent,
		GrupoComponent,
		GruposComponent,
		RubroComponent,
		RubrosComponent,
		CuentaComponent,
		CuentasComponent,
		SubcuentaComponent,
		SubcuentasComponent,
		SectorComponent,
		SectoresComponent,
		FinancieroComponent,
		FinancierosComponent,
		EconomiaComponent,
		EconomiasComponent,
		ClasAdministrativasComponent,
		ClasAdministrativaComponent,
		SubeconomiaComponent,
		SubeconomiasComponent,

		EmpresaComponent,
		EmpresasComponent,
		UnidadesAdminComponent,
		UnidadAdminComponent,
		CcostoComponent,
		CcostosComponent,
		CtrabajosComponent,
		CtrabajoComponent,
		FinalidadesComponent,
		FinalidadComponent,
		FuncionComponent,
		FuncionesComponent,
		SubfuncionComponent,
		SubfuncionesComponent,
		FuentesComponent,
		SubfuentesComponent,
		TiposComponent
	],
	imports: [
		ChartsModule,
		CommonModule,
		SharedModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AdminRoutingModule
	]
})
export class AdminModule { }
