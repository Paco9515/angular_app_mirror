import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './components/admin.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
	],
	imports: [
		AdminModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
