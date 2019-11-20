import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CapitulosComponent } from '../pages/admin/classification/cog/capitulo/capitulos.component';
import { CapituloComponent } from '../pages/admin/classification/cog/capitulo/capitulo.component';
import { ConceptoComponent } from '../pages/admin/classification/cog/concepto/concepto.component';
import { PartidaComponent } from '../pages/admin/classification/cog/partida/partida.component';
import { ConceptosComponent } from '../pages/admin/classification/cog/concepto/conceptos.component';
import { PartidasComponent } from '../pages/admin/classification/cog/partida/partidas.component';
import { GeneroComponent } from '../pages/admin/classification/cc/genero/genero.component';
import { GenerosComponent } from '../pages/admin/classification/cc/genero/generos.component';
import { GrupoComponent } from '../pages/admin/classification/cc/grupo/grupo.component';
import { GruposComponent } from '../pages/admin/classification/cc/grupo/grupos.component';
import { RubroComponent } from '../pages/admin/classification/cc/rubro/rubro.component';
import { RubrosComponent } from '../pages/admin/classification/cc/rubro/rubros.component';
import { CuentaComponent } from '../pages/admin/classification/cc/cuenta/cuenta.component';
import { CuentasComponent } from '../pages/admin/classification/cc/cuenta/cuentas.component';
import { SubcuentaComponent } from '../pages/admin/classification/cc/subcuenta/subcuenta.component';
import { SubcuentasComponent } from '../pages/admin/classification/cc/subcuenta/subcuentas.component';
import { SectorComponent } from '../pages/admin/classification/ca/sector/sector.component';
import { SectoresComponent } from '../pages/admin/classification/ca/sector/sectores.component';
import { FinancieroComponent } from '../pages/admin/classification/ca/financiero/financiero.component';
import { FinancierosComponent } from '../pages/admin/classification/ca/financiero/financieros.component';
import { EconomiaComponent } from '../pages/admin/classification/ca/economia/economia.component';
import { EconomiasComponent } from '../pages/admin/classification/ca/economia/economias.component';
import { ClasAdministrativasComponent } from '../pages/admin/classification/ca/clas-administrativas/clas-administrativas.component';
import { ClasAdministrativaComponent } from '../pages/admin/classification/ca/clas-administrativas/clas-administrativa.component';
import { SubeconomiaComponent } from '../pages/admin/classification/ca/subeconomia/subeconomia.component';
import { SubeconomiasComponent } from '../pages/admin/classification/ca/subeconomia/subeconomias.component';

// import { FilterPipe } from '../pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TipoGastoComponent } from '../pages/admin/classification/clasfTipoGasto/tipo-gasto.component';
import { TipoGastosComponent } from '../pages/admin/classification/clasfTipoGasto/tipo-gastos.component';

@NgModule({
	declarations: [
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
		TipoGastoComponent,
		TipoGastosComponent,
	],
	exports: [
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
		SubeconomiasComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AdminRoutingModule,
		BrowserAnimationsModule , //  módulo de animaciones requerido
		ToastrModule.forRoot() //  ToastrModule agregado
	]
})
export class CristiModule { }
