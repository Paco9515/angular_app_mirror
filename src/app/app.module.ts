import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
// import { ChartsModule } from 'node_modules/ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './components/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
// import { IncrementadorComponent } from './reusable/incrementador/incrementador.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		// IncrementadorComponent,
	],
	imports: [
		AdminModule,
		FormsModule,
		// ChartsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
