import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './pages/admin/admin.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent
	],
	imports: [
		AdminModule,
		FormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
  		ToastrModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
