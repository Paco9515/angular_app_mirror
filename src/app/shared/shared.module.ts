import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableClasificacionComponent } from './tables/tableClasificacion/tableClasificacion.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
	declarations: [
		HeaderComponent,
		MenuComponent,
		FooterComponent,
		NopagefoundComponent,
		BreadcrumbsComponent,
		TableClasificacionComponent,
		LoadingComponent
	],
	exports: [
		HeaderComponent,
		MenuComponent,
		FooterComponent,
		NopagefoundComponent,
		BreadcrumbsComponent,
		TableClasificacionComponent,
		LoadingComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class SharedModule { }
