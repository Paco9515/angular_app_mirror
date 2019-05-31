import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProgramasComponent } from './components/cp/programa/programas.component';
import { EscritorioComponent } from './components/escritorio/escritorio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProgramaComponent } from './components/cp/programa/programa.component';
import { ToastrModule } from 'ngx-toastr';
import { CapitulosComponent } from './components/cog/capitulo/capitulos.component';
import { CapituloComponent } from './components/cog/capitulo/capitulo.component';
import { ConceptoComponent } from './components/cog/concepto/concepto.component';
import { PartidaComponent } from './components/cog/partida/partida.component';
import { ConceptosComponent } from './components/cog/concepto/conceptos.component';
import { PartidasComponent } from './components/cog/partida/partidas.component';
import { GeneroComponent } from './components/cc/genero/genero.component';
import { GenerosComponent } from './components/cc/genero/generos.component';
import { GrupoComponent } from './components/cc/grupo/grupo.component';
import { GruposComponent } from './components/cc/grupo/grupos.component';
import { RubroComponent } from './components/cc/rubro/rubro.component';
import { RubrosComponent } from './components/cc/rubro/rubros.component';
import { CuentaComponent } from './components/cc/cuenta/cuenta.component';
import { CuentasComponent } from './components/cc/cuenta/cuentas.component';
import { SubcuentaComponent } from './components/cc/subcuenta/subcuenta.component';
import { SubcuentasComponent } from './components/cc/subcuenta/subcuentas.component';
import { SectorComponent } from './components/ca/sector/sector.component';
import { SectoresComponent } from './components/ca/sector/sectores.component';
import { FinancieroComponent } from './components/ca/financiero/financiero.component';
import { FinancierosComponent } from './components/ca/financiero/financieros.component';
import { EconomiaComponent } from './components/ca/economia/economia.component';
import { EconomiasComponent } from './components/ca/economia/economias.component';
import { ClasAdministrativasComponent } from './components/ca/clas-administrativas/clas-administrativas.component';
import { ClasAdministrativaComponent } from './components/ca/clas-administrativas/clas-administrativa.component';
import { SubeconomiaComponent } from './components/ca/subeconomia/subeconomia.component';
import { SubeconomiasComponent } from './components/ca/subeconomia/subeconomias.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		MenuComponent,
		FooterComponent,
		ProgramasComponent,
		EscritorioComponent,
		ProgramaComponent,
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
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		ToastrModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
