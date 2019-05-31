import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: '**', component: NopagefoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
